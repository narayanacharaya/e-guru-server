from flask import Flask, request, jsonify
import pandas as pd
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load the dataset and preprocess it
df = pd.read_csv("courses.csv", encoding='latin1')
df['clean_course_name'] = df['name'].apply(nfx.remove_stopwords)  # Use 'name' instead of 'course_title'
df['clean_course_name'] = df['clean_course_name'].apply(nfx.remove_special_characters)

# Vectorize the text using CountVectorizer
count_vect = CountVectorizer()
cv_mat = count_vect.fit_transform(df['clean_course_name'])

# Calculate the cosine similarity matrix for course names
cosine_sim_mat = cosine_similarity(cv_mat)

# Create a mapping of course names to indices
course_indices = pd.Series(df.index, index=df['name']).drop_duplicates()

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    name = data.get('name')
    num_of_rec = data.get('num_of_rec', 10)
    
    recommended_courses = recommend_course(name, num_of_rec)
    
    # Create a list of recommendations with name, _id, thumbnail, and author
    recommendations = []
    for _, row in recommended_courses.iterrows():
        recommendations.append({
            'name': row['name'],
            '_id': row['_id'],
            'thumbnail': row['thumbnail'],
            'author': row['author']
        })
    
    return jsonify(recommendations)

def recommend_course(name, num_of_rec=10):
    idx = course_indices[name]  # Get the index of the given course name
    scores = list(enumerate(cosine_sim_mat[idx]))  # List of cosine similarity scores for the course
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)  # Sort scores in descending order

    # Omit the first value (itself), and get selected course indices and scores
    selected_course_indices = [i[0] for i in sorted_scores[1:num_of_rec+1]]
    selected_course_scores = [i[1] for i in sorted_scores[1:num_of_rec+1]]

    # Get the recommended course details including '_id', 'thumbnail', and 'author'
    recommended_result = df[['name', '_id', 'thumbnail', 'author']].iloc[selected_course_indices]
    
    # Create a DataFrame with recommended courses and their similarity scores
    rec_df = pd.DataFrame(recommended_result)
    rec_df['similarity_scores'] = selected_course_scores
    
    return rec_df

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
