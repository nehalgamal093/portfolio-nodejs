import { projectModel } from "../../../models/project.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import cloudinary from '../../../config/cloudinary.js';


const createProject = catchAsyncError(
  async (req, res) => {

   
   if(req.body.title || (req.files && req.files.length > 0)){
    try{
      let images = null;

      if(req.files && req.files.length > 0){
        images = [];
    
        for(const file of req.files){
          const {path} = file;
         
          images.push({
            attachment_file:(await cloudinary.uploader.upload(path)).secure_url,
            cloudinary_id: (await cloudinary.uploader.upload(path)).public_id
          })
        }
       
      }
      const newProject = new projectModel({
        title:req.body.title,
        description:req.body.description,
        type:req.body.type,
        tags:req.body.tags,
        gitlink:req.body.gitlink,
        googleplaylink:req.body.googleplaylink,
        images:images,
       cover:images[0].attachment_file
      })
      const result = await newProject.save();
      res.status(200).json({success:"Project created",result})
    }catch(err){
      console.log(err)
    }
 
   } else {
    res.status(500).json({
      errors:{
        common:{
          msg:"Couldn't create project"
        }
      }
    })
   }
  
    // // req.body.images = req.files.images.map((obj)=>obj.filename)
    // let result = new projectModel(req.body);
    // await result.save();
    // res.json({ message: "success", result });
  }
);

const getAllProjects = catchAsyncError(async (req,res) =>{
  let result = await projectModel.find({})
  res.json({message:'success',result})
})
const getProject = catchAsyncError(async (req,res)=>{
  const {id} = req.params;
  let result = await projectModel.findById(id);
  result && res.json({message:"success",result})
})

const updateProject = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  let result = await projectModel.findByIdAndUpdate(id,req.body,{new:true});
  !result && next('problem updating')
  result && res.json({message:"success",result})
})

const deleteProject = catchAsyncError(async (req,res,next)=>{
  const {id} = req.params;
  let result = await projectModel.findByIdAndDelete(id);
  !result && next('not Found')
  result && res.json({message:'success',result})
})


export { createProject,getAllProjects, deleteProject ,updateProject,getProject};
