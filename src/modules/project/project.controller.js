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

export { createProject };
