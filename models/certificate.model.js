import mongoose from "mongoose";

const certificateSchema = mongoose.Schema(
  {
    
    image: String,
 
  },
  { timestamps: true }
);

certificateSchema.post("init", (doc) => {
  doc.image = process.env.DBURL + "/certificate/" + doc.image
  
});
export const certificateModel = mongoose.model("certificate", certificateSchema);