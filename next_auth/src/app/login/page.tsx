"use client"



import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useState } from 'react'

function loginPage() {

    const [password, setPassword] = useState(false);
    const [user, setUser] = React.useState({
        email:"",
        password:"",
    })

    const onLogin = async() =>{
        try{
            const response = await axios.post('/api/user/login', user);
            if(response.status === 200){
                console.log("Login Success", response.data)
            }
            return NextResponse.json({
                status: response.status,
                data: response.data,
            })
        }catch(error:any){
            console.log(error.message);
        }
    }

    const showPass:any = () => {
        setPassword(!password)
    }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>login page</h1>
        <hr />
        <label>Email</label>
        <input className='text-black'
            id='email'
            placeholder='email'
            type='email'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
        />
        <label>Password</label>
        <input className='text-black'
            id='password'
            placeholder='password'
            type={password ? 'text' : 'password'}
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
        />
        <button onClick={showPass}>{password ? 'Hide Password':'Show Password'}</button>
        <button onClick={onLogin}>Login</button>
    </div>
  )
}

export default loginPage