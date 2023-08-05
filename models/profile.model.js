import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: "true",
      required: [true, "Project name is required"],
      minLength: [5, "too short project name"],
    },
    position: {
      type: String,
      trim: "true",
      required: [true, "Project type is required"],
      minLength: [5, "too short project type"],
    },
    summary: {
      type: String,
      trim: "true",
      required: [true, "Project description is required"],
      minLength: [10, "too short project description"],
    },
    gitlink: {
      type: String,
      trim: "true",
      minLength: [10, "too short project description"],
    },
    googleplaylink: {
      type: String,
      trim: "true",
      minLength: [10, "too short project description"],
    },
    email: {
      type: String,
      trim: "true",
      minLength: [10, "too short project description"],
    },
    linkedinlink: {
      type: String,
      trim: "true",
      minLength: [10, "too short project description"],
    },
    downloadcv: {
      type: String,
      trim: "true",
      minLength: [10, "too short project description"],
    },
    image:String,

  },
  { timestamps: true }
);
profileSchema.post("init", (doc) => {
  doc.image = "http://localhost:3000" + "/profile/" + doc.image
  
});
export const profileModel = mongoose.model("profile", profileSchema);
