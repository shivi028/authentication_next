// connect with database
import { connect } from "@/dbConfig/dbConfig";
// user model
import User from "@/models/user.model";
// next/server for response
import { NextResponse, NextRequest } from "next/server";
// password hashing
import bcryptjs from 'bcryptjs'
// mail
import { sendEmail } from "@/helpers/Mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        // destructing
        const {username, email, password} = reqBody
        // validation krna hai

        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json(
                {error: "User already exists"}, 
                {status: 400}
            )
        }

        // hashing password using bcrypt
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification mail
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

    } catch (error : any) {
        return NextResponse.json(
            {error: error.message}, 
            {status: 500}
        )
    }
}