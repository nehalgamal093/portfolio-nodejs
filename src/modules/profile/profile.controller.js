import { profileModel } from "../../../models/profile.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

const createProfile = catchAsyncError(
  async (req, res) => {
    // req.body.image = req.file.filename;
    let result = new profileModel(req.body);
    await result.save();
    res.json({ message: "success", result });
  }
);

const getAllProfile = catchAsyncError(async (req,res) =>{
  let result = await profileModel.find({})
  res.json({message:'success',result})
})




const updateProfile = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  let result = await profileModel.findByIdAndUpdate(id,req.body,{new:true});
  !result && next('problem updating')
  result && res.json({message:"success",result})
})

const deleteProfile = catchAsyncError(async (req,res,next)=>{
  const {id} = req.params;
  let result = await profileModel.findByIdAndDelete(id);
  !result && next('not Found')
  result && res.json({message:'success',result})
})


export { createProfile,getAllProfile, deleteProfile ,updateProfile};
