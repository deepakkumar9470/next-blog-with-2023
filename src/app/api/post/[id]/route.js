import Post from "@/models/Post"
import connection from "@/utils/db"
import { verifyJwtToken } from "@/utils/jwt"
import { NextResponse } from "next/server"

export const GET = async (req,ctx)=>{
    await connection()
    const id = ctx.params.id
   try {
    
       const post = await Post.findById(id).populate('authorId').select('-password')
       return new NextResponse(JSON.parse(JSON.stringify(post)), {status: 200})

   } catch (error) {
    return new NextResponse('Ops error in posting', {status: 501})

   }
}


export const PUT = async (req,ctx)=>{
    await connection()
    const id = ctx.params.id

    
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]
     
    const decodeToken = verifyJwtToken(token)

    if(!accessToken || !decodeToken){
     return new NextResponse(JSON.stringify({error:'unauthorized (wrong or expired token)'}), {status : 401})
    }
     
   try {
       const body = await req.json()
       const post = await Post.findById(id).populate('authorId')
       if(post?.authorId?._id.toString() !==decodeToken._id.toString() ){
        return new NextResponse(JSON.stringify({msg : 'Only owner of this post be able to update!'}), {status: 403})

       }

        const updatePost = await Post.findByIdAndUpdate(id, {$set : {...body}}, {new  : true})
        return new NextResponse(JSON.stringify(updatePost), {status: 201})

   } catch (error) {
    return new NextResponse('Ops error in posting', {status: 501})

   }
}



export const DELETE = async (req,ctx)=>{
    await connection()
    const id = ctx.params.id

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]
     
    const decodeToken = verifyJwtToken(token)

    if(!accessToken || !decodeToken){
     return new NextResponse(JSON.stringify({error:'unauthorized (wrong or expired token)'}), {status : 401})
    }
     
   try {
       const post = await Post.findById(id).populate('authorId')
       if(post?.authorId?._id.toString() !==decodeToken._id.toString() ){
        return new NextResponse(JSON.stringify({msg : 'Only owner of this post be able to delete!'}), {status: 403})

       }

         await Post.findByIdAndDelete(id)
        return new NextResponse(JSON.stringify({msg : 'Post has been deleted success!'}), {status: 200})

   } catch (error) {
    return new NextResponse('Ops error in posting', {status: 501})

   }
}