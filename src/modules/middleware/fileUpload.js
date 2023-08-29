import multer from 'multer';
const path = require('path');

let options = (folderName) =>{
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,path.join(path.dirname(),`uploads/${folderName}`));
        },
        filename:function(req,file,cb){
            const uniqueSuffix = Date.now() + "-" +Math.round(Math.random() * 1e9);
            cb(null,uniqueSuffix+'-'+file.originalname);
        }
    })

    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        } else {
            cb("Error pic",false)
        }
    }
    return multer({storage,fileFilter});
}
export const uploadSingleFile = (fieldName,folderName) => 
options(folderName).single(fieldName)
export const uploadMixOfFiles = (arrayOfFields,folderName) =>
options(folderName).fields(arrayOfFields)