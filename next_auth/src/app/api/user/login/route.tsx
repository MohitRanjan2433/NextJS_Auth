import { NextRequest, NextResponse } from 'next/server';
import { Connect } from '../../../../dbConfig/dbConfig';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();
Connect()

const secretKey = process.env.TOKEN_SECRET;

if (!secretKey) {
    throw new Error("Missing TOKEN_SECRET environment variable");
  }
  

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
        if(!email || !password){
            return NextResponse.json({
                status: false,
                message: 'Please fill all the fields'
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                status: false,
                message: 'User not found'
            })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({message:"Incorrect Password"}, {status: 400})
        }
        console.log(user);
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData, secretKey, {expiresIn: "1d"})

        const response = NextResponse.json({
            status: true,
            message: 'User logged in successfully',
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
