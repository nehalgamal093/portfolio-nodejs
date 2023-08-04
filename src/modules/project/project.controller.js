import { projectModel } from "../../../models/project.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

const createProject = catchAsyncError(
  async (req, res) => {
    req.body.images = req.files.images.map((obj)=>obj.filename)
    let result = new projectModel(req.body);
    await result.save();
    res.json({ message: "success", result });
  }
);

const getAllProjects = catchAsyncError(async (req,res) =>{
  let result = await projectModel.find({})
  res.json({message:'success',result})
})

const deleteProject = catchAsyncError(async (req,res,next)=>{
  const {id} = req.params;
  let result = await projectModel.findByIdAndDelete(id);
  !result && next('not Found')
  result && res.json({message:'success',result})
})
export { createProject,getAllProjects, deleteProject };
