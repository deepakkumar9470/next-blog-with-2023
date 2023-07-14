import Comment from "@/models/Comment"
import connection from "@/utils/db"
import { verifyJwtToken } from "@/utils/jwt"
import { NextResponse } from "next/server"

export const GET = async (req,ctx)=>{
    await connection()
    const id = ctx.params.id
   try {
    
       const comments = await Comment.find({postId : id}).populate('authorId')
       return new NextResponse(JSON.stringify(comments), {status: 200})

   } catch (error) {
    return new NextResponse('Ops error in posting', {status: 501})

   }
}




export const DELETE = async (req,ctx)=>{
    await connection()
    const id = ctx.params.id
    await connection()
    
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]
     
    const decodeToken = verifyJwtToken(token)

    if(!accessToken || !decodeToken){
     return new NextResponse(JSON.stringify({error:'unauthorized (wrong or expired token)'}), {status : 401})
    }
     
   try {
       const post = await Comment.findById(id).populate('authorId')
       if(post?.authorId?._id.toString() !== decodeToken._id.toString() ){
        return new NextResponse(JSON.stringify({msg : 'Only owner of this post be able to delete!'}), {status: 403})

       }

         await Comment.findByIdAndDelete(id)
        return new NextResponse(JSON.stringify({msg : 'Comment has been deleted success!'}), {status: 200})

   } catch (error) {
    return new NextResponse('Ops error in posting', {status: 501})

   }
}