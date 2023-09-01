from flask import Flask, request, jsonify
import pandas as pd
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

app = Flask(__name__)

# Load the dataset and preprocess it
df = pd.read_csv("udemy_courses.csv")
df['clean_course_title'] = df['course_title'].apply(nfx.remove_stopwords)
df['clean_course_title'] = df['clean_course_title'].apply(nfx.remove_special_characters)

# Vectorize the text using CountVectorizer
count_vect = CountVectorizer()
cv_mat = count_vect.fit_transform(df['clean_course_title'])

# Calculate the cosine similarity matrix
cosine_sim_mat = cosine_similarity(cv_mat)

# Create a mapping of course titles to indices
course_indices = pd.Series(df.index, index=df['course_title']).drop_duplicates()

# Load the recommendation model from the .pkl file
# with open('recommendation_model.pkl', 'rb') as model_file:
#     model_data = pickle.load(model_file)
#     cosine_sim_mat = model_data['cosine_sim_mat']
#     course_indices = model_data['course_indices']

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    title = data.get('title')
    num_of_rec = data.get('num_of_rec', 10)
    
    recommended_courses = recommend_course(title, num_of_rec)
    
    # Add 'course_id' to the recommended courses
    recommended_courses['course_id'] = recommended_courses.index
    
    return jsonify(recommended_courses.to_dict(orient='records'))

def recommend_course(title, num_of_rec=10):
    idx = course_indices[title]  # Get the index of the given course title
    scores = list(enumerate(cosine_sim_mat[idx]))  # List of cosine similarity scores for the course
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)  # Sort scores in descending order

    # Omit the first value (itself), and get selected course indices and scores
    selected_course_indices = [i[0] for i in sorted_scores[1:num_of_rec+1]]
    selected_course_scores = [i[1] for i in sorted_scores[1:num_of_rec+1]]

    # Get the recommended course titles based on selected indices
    recommended_result = df['course_title'].iloc[selected_course_indices]
    
    # Create a DataFrame with recommended courses and their similarity scores
    rec_df = pd.DataFrame(recommended_result)
    rec_df['similarity_scores'] = selected_course_scores
    
    return rec_df

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
