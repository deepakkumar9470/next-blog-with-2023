import Post from "@/models/Post"
import connection from "@/utils/db"
import { verifyJwtToken } from "@/utils/jwt"
import { NextResponse } from "next/server"

export const GET = async (req)=>{

    await connection()
    
    try {
        const posts = await Post.find({}).limit(16).populate("authorId")
        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}



export const POST = async (req)=>{
     await connection()
    
       const accessToken = req.headers.get('authorization')
       const token = accessToken.split(' ')[1]
        
       const decodeToken = verifyJwtToken(token)

       if(!accessToken || !decodeToken){
        return new NextResponse(JSON.stringify({error:'unauthorized (wrong or expired token)'}), {status : 401})
       }
        
    
    try {
        const body = await req.json()
        const newpost = await Post.create(body)
        return new NextResponse(JSON.stringify(newpost), {status: 201})
    } catch (error) {
        return new NextResponse('Ops error in posting', {status: 501})

    }
}