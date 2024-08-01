'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const VerifyEmailPage = () => {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
      setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.date)
    }
  }

  // logic to get the token from url
  // it mounted every time
  useEffect(() => {
    // core js code
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // next js code through query
    // const {query} = router;    //destructing of query
    // const urlTokenNext = query.token

  }, [])

  // optional useeffect when the token changes it should get affect or render
  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-2cl font-bold tracking-wider'>Verify Email</h1>
        <h2 className='bg-orange-500 text-black p-2 rounded-md mt-4'>
          {token ? `${token}` : 'no token'}
        </h2>
        {
          verified && (
            <div>
              <h2>Verified</h2>
              <Link href={'/log-in'}>login</Link>
            </div>
          )
        }
        {
          error && (
            <div>
              <h2>error</h2>
            </div>
          )
        }
      </div>
    </>
  )
}

export default VerifyEmailPage
