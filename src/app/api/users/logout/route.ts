import { connect } from "@/dbConfig/dbConfig"; 
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set('token', '', {httpOnly: true, expires: new Date(0)})
        return response
        
    } catch (error) {
        return NextResponse.json({error: "unable to logout"}, {status: 500})
    }
}