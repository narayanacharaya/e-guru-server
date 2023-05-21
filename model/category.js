const mongose= require('mongoose');
const categorySchmea= new mongose.Schema({
    _id:mongose.Schema.Types.ObjectId,
    name:{
        type:String,
        required: true
    }
})
module.exports = mongose.model('Category', categorySchmea);