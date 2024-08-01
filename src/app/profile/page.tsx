'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState()
  return (
    <>
        <div>
            <h1>Profile</h1>
        </div>
      
    </>
  )
}

export default ProfilePage
