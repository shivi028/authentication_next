'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LogIn = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogIn = async() =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log('login success', response.data)
            router.push('/profile')

        } catch (error : any) {
            console.error('login Failed')
        }
    }

    // logic building
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'> 
        <h1 className='text-3xl pb-8'>{loading ? "Processing" : "Login"}</h1>
        <hr />
         <label htmlFor='username' className='mt-8'>email</label>
        <input 
        id='email'
        value={user.email}
        onChange={(e)=>setUser({...user, email: e.target.value})}
        placeholder='email'
        className='px-4 text-black p-2 focus:outline-none focus:border-gray-500 rounded'
        type="text" 
        />
         <label htmlFor='password' className='mt-8'>password</label>
        <input 
        id='password'
        value={user.password}
        onChange={(e)=>setUser({...user, password: e.target.value})}
        placeholder='password'
        className='px-4 text-black p-2 focus:outline-none focus:border-gray-500 rounded'
        type="text" 
        />

        <button 
        type='submit'
        onClick={onLogIn}
        className='px-4 text-white border border-white mt-10 p-2 focus:outline-none focus:border-gray-500 rounded'
        >
            {buttonDisabled? "No Login": 'Login'}
        </button>

        <Link href={'/sign-up'} className='mt-4'>visit signup page</Link>

      </div>
    </>
  )
}

export default LogIn
