import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        // destructuring token
        const {token} = reqBody
        console.log("Token", token)

        // checking token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: 'Invalid token'}, {status: 400})
        }

        console.log("user", user)

        // token valid handling other states on verifing the user
        user.isVerified = true
        user.verifyTokenExpiry = undefined
        user.verifyToken = undefined
        
        // saving changes in db
        await user.save()

        // returning response
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, {status: 200})

    } catch (error : any) {
     return NextResponse.json({error: error.message}, {status: 500})   
    }
}