import multer from "multer";

export const FileTypes = {
    image:['image/png','image/jpg','image/webp','image/jpeg','image/bmp'],
    PDF:['application/pdf'],
}


function fileUpload(CustomValidation = []){
    const storage = multer.diskStorage({})
    function fileFilter(req,file,cb){
        if(CustomValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb('Invalid Format',false);
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}
export default fileUpload;
