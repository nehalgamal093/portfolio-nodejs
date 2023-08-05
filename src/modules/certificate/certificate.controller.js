import { certificateModel } from "../../../models/certificate.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

const createcertificate = catchAsyncError(
  async (req, res) => {
    req.body.image = req.file.filename;
    let result = new certificateModel(req.body);
    await result.save();
    res.json({ message: "success", result });
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
