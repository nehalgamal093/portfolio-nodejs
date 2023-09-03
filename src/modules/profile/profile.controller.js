import { profileModel } from "../../../models/profile.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import cloudinary from "../../../config/cloudinary.js";


const createProfile = catchAsyncError(
  async (req, res) => {
    let newProfile;
    try{
      if(req.files && req.files.length > 0){
        newProfile = new profileModel(
         {title:req.body.title,
          position:req.body.position,
          summary:req.body.summary,
          gitlink:req.body.gitlink,
          googleplaylink:req.body.googleplaylink,
          email:req.body.email,
          linkedinlink:req.body.linkedinlink,
          downloadcv:req.body.downloadcv,
          
          image:(await cloudinary.uploader.upload(req.files[0].path)).secure_url,
            cloudinary_id:(await cloudinary.uploader.upload(req.files[0].path)).public_id}
        )
      } else {
        newCenewProfilert = new profileModel({
          ...req.body
        });
      }
      await newProfile.save();
      res.status(200).json({sucess:"Certificate added successfully",newProfile})
    }catch(err){
      res.status(500).json({
        errors:{
          common:{
            msg:err.message
          }
        }
      })
    }
    // req.body.image = req.file.filename;
    // let result = new profileModel(req.body);
    // await result.save();
    // res.json({ message: "success", result });
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
