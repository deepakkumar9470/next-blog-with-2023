import Post from "@/models/Post"
import connection from "@/utils/db"
import { verifyJwtToken } from "@/utils/jwt"
import { NextResponse } from "next/server"

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
 
      const post = await Post.findById(id)
      if(post.likes.includes(decodeToken._id)){
         post.likes = post.likes.filter((id) => id.toString() !== decodeToken._id.toString())
      }else{
         post.likes.push(decodeToken._id)
      }  
      
        await post.save()
 
       return new NextResponse(JSON.stringify({msg : 'Successfully liked the post'}), {status: 200})

  } catch (error) {
   return new NextResponse('Ops error in posting', {status: 501})

  }
}
