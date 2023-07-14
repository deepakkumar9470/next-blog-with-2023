import mongoose, { mongo } from "mongoose";

const {Schema}= mongoose

const PostSchema = new Schema({
    title : {
        type:String,
        unique:true,
        required : true
    },
    desc : {
        type:String,
        unique:true,
        required : true
    },
    category :{
        type : String,
        required : true,
        enum :[
             'Sports',
             'Programing',
             'News',
             'Lift Style',
             'Tech',
             'Vlogging'
        ]
    },
    authorId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref  :'User'  
    },
    likes : {
        type  : [mongoose.Schema.Types.ObjectId],
        ref  :'User',
        default: []
    }
},{timestamps : true})

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
