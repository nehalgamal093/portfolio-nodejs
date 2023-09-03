import mongoose from "mongoose";

const certificateSchema = mongoose.Schema(
  {
    
    image: String,
    cloudinary_id:String
 
  },
  { timestamps: true }
);


export const certificateModel = mongoose.model("certificate", certificateSchema);
