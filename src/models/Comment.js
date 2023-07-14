import mongoose, { mongo } from "mongoose";

const {Schema}= mongoose

const CommentSchema = new Schema({
    text : {
        type : String,
        requird : true
    },
    postId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref  :'Post'  
    },
    authorId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref  :'User'  
    },
    
},{timestamps : true})

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
