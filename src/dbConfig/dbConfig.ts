import mongoose from "mongoose";


export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDb is Connected")
        })

        connection.on('error', (e)=>{
            console.log('Mongodb connection error, please make sure db is connected: '+ e);
            process.exit()
        })

    } catch (error) {
     console.log('Something went wrong in connecting to db', error)
    }
}


