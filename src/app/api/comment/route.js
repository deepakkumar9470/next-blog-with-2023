import Comment from "@/models/Comment"
import connection from "@/utils/db"
import { verifyJwtToken } from "@/utils/jwt"
import { NextResponse } from "next/server"


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
        let newcomment = await Comment.create(body)
        newcomment = await newcomment.populate('authorId')
        return new NextResponse(JSON.stringify(newcomment), {status: 201})
    } catch (error) {
        return new NextResponse('Ops error in posting', {status: 501})

    }
}