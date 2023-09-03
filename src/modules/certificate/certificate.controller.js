import cloudinary from "../../../config/cloudinary.js";
import { certificateModel } from "../../../models/certificate.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

const createcertificate = catchAsyncError(
  async (req, res) => {
    let newCert;
    try{
      if(req.files && req.files.length > 0){
        newCert = new certificateModel(
         { image:(await cloudinary.uploader.upload(req.files[0].path)).secure_url,
            cloudinary_id:(await cloudinary.uploader.upload(req.files[0].path)).public_id}
        )
      } else {
        newCert = new certificateModel({
          ...req.body
        });
      }
      await newCert.save();
      res.status(200).json({sucess:"Certificate added successfully",newCert})
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
    // let result = new certificateModel(req.body);
    // await result.save();
    // res.json({ message: "success", result });
  }
);

const getAllCertificate = catchAsyncError(async (req,res) =>{
  let result = await certificateModel.find({})
  res.json({message:'success',result})
})




const deleteCertificate = catchAsyncError(async (req,res,next)=>{
  const {id} = req.params;
  let result = await certificateModel.findByIdAndDelete(id);
  !result && next('not Found')
  result && res.json({message:'success',result})
})


export { createcertificate,getAllCertificate, deleteCertificate };
