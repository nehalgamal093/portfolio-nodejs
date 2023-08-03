import mongoose from "mongoose";


export function dbConnection(){
    mongoose.connect(process.env.DBURL).then(()=>{
        console.log("Mongo connected successfully");
    }).catch((err) =>{
        console.log(`Error is ${err}`)
    })
}