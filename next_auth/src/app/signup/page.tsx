"use client"
import axios from "axios";
import { NextResponse } from "next/server";
import React, { useState } from 'react'

function SignupPage() {
    const [password, ShowPassword] = useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignUp = async () => {
        try{
            const response = await axios.post('/api/user/signup', user)
            if(response.status === 200){
                console.log("Signup success", response.data);
            }
        }catch(error:any){
            return NextResponse.json({error:"Error On signUp"});
        }
    } 

    const showPass:any = () => {
        ShowPassword(!password)
    }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Signup</h1>
        <hr />
        <label>UserName</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id='username'
            type='text'
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder='username' 
        />
        <label>email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id='email'
            type='email'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='email' 
        />
        <label>password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id='password'
            type={password ? 'text' : 'password'}
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='password' 
        />
        <button onClick={showPass}>{password ? 'Hide Password' : 'Show Password'}</button>
        <button className='hover:bg-red-500' onClick={onSignUp}>SignUp</button>
    </div>
  )
}

export default SignupPage