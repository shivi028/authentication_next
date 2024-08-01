import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
   try {
     const reqBody = await request.json()
 
     // destructing the reqBody
     const {email, password} = reqBody
    console.log(reqBody)

    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({error: 'User Does Not Exists'}, {status: 500})
    }
    console.log("user exist")
    
    // verifying password with bcrypt with true or false return
    const validPassword = await bcryptjs.compare(password, user.password)

    if(!validPassword) {
        return NextResponse.json({error: "Check your credentials"}, {status: 400})
    }

    // now user is verified, generate token using json web token

    // payload as in data hi object me jo daalna ho daal skte (jitna bada token, utna bandwidth)
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

    // holding nextResponse reference in a variable so we can add the cookies as well
    const response = NextResponse.json(
        {
            message: "logged in success",
            success: true
        })
        // cookies set
        response.cookies.set('token', token, {httpOnly: true})
        return response

   } catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500})
   }
}