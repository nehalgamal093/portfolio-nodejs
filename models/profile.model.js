import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: "true",
      required: [true, "Project name is required"],
      minLength: [5, "too short profile title"],
    },
    position: {
      type: String,
      trim: "true",
      required: [true, "Project type is required"],
      minLength: [5, "too short position"],
    },
    summary: {
      type: String,
      trim: "true",
      required: [true, "Project description is required"],
      minLength: [10, "too short summary "],
    },
    gitlink: {
      type: String,
      trim: "true",
      minLength: [10, "too short gitlink"],
    },
    googleplaylink: {
      type: String,
      trim: "true",
      minLength: [10, "too short googleplaylink"],
    },
    email: {
      type: String,
      trim: "true",
      minLength: [10, "too short email"],
    },
    linkedinlink: {
      type: String,
      trim: "true",
      minLength: [10, "too short linkedinlink"],
    },
    downloadcv: {
      type: String,
      trim: "true",
      minLength: [10, "too short downloadcv"],
    },
    image:String,

  },
  { timestamps: true }
);
profileSchema.post("init", (doc) => {
  doc.image = process.env.BASEURL +  doc.image
  
});
export const profileModel = mongoose.model("profile", profileSchema);
