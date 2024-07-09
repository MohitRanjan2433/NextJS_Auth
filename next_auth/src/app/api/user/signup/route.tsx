import {Connect} from "../../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

Connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody;

        console.log(reqBody);

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json({error:"User already exists"}, {status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword =  await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message:"User Created Successfully",
            success: true,
            savedUser
        })
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}