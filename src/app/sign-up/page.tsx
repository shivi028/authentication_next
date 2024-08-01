'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUp = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignUp = async() =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log('signup success', response.data)
            router.push('/sign-up')

        } catch (error : any) {
            console.error('Signup Failed')
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'> 
        <h1 className='text-3xl pb-8'>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor='username'>username</label>
        <input 
        id='username'
        value={user.username}
        onChange={(e)=>setUser({...user, username: e.target.value})}
        placeholder='username'
        className='px-4 text-black p-2 focus:outline-none focus:border-gray-500 rounded'
        type="text" 
        />
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
        onClick={onSignUp}
        className='px-4 text-white border border-white mt-10 p-2 focus:outline-none focus:border-gray-500 rounded'
        >
            {buttonDisabled? "No Signup": 'Signup'}
        </button>

        <Link href={'/log-in'}>login</Link>

      </div>
    </>
  )
}

export default SignUp
