import User from '@/models/User'
import connection from '@/utils/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'


export const POST  =  async (req,ctx) =>{
    const {username,email,password:pass} = await req.json()

    try {
           await connection()

           const existingUser = await User.findOne({email})
           if(existingUser) throw new Error('User already exist')
           const hashPass = await bcrypt.hash(pass,10)

           const newuser = await User.create({username,email, password :  hashPass})
           const {password,...user} = newuser._doc
           return new NextResponse(JSON.stringify(user), {status : 201})
         
    } catch (error) {
        console.log(error)
        return new NextResponse('Opps errro while registering', {status : 500})

    }

}