import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: "true",
      required: [true, "Project name is required"],
      minLength: [5, "too short project name"],
    },
    type: {
      type: String,
      trim: "true",
      required: [true, "Project type is required"],
      minLength: [2, "too short project type"],
    },
    description: {
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

      
    },
    images: [{
      attachment_file:String,
      cloudinary_id:String
    }],
    cover:String,
    tags: [String],
  },
  { timestamps: true }
);

// projectSchema.post("init", (doc) => {

//   doc.images = doc.images.map(
//     (path) => process.env.BASEURL + path
   
//   );
// });
export const projectModel = mongoose.model("project", projectSchema);
