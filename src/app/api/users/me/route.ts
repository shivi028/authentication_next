import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/GetDatafromToken";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        // extract data from token
        const user_id = await getDataFromToken(request)
        const user = await User.findOne({_id: user_id}).select("-password")

        // check if there is no user
        if(!user){
            return NextResponse.json({message: "user not found with data"})
        }
        return NextResponse.json({
            message: 'User found',
            data: user
        })
    } catch (error) {
        
    }
}