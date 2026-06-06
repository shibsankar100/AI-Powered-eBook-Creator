const multer=require("multer");
const path=require("path");
const fs=require("fs");

// Create uploads directory if it doen't exits
const uploadDir="uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir,{ recursive:true});

}

// set up storage engine
const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(
            null,
            `${file.fieldname}-${Data.now()}${path.extname(file.originalname)}`
        );
    },
});

// check file type
function checkFileType(file,cb){
    const filetype=/jpeg|jpg|png|gif/;
    const extname=filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetype.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null,true);
    } else {
        cb("Error:images Only!");
    }
}

// initialize upload
const upload=multer({
    storage:storage,
    limits:{fileSize:2 * 1024 * 1024}, // 2mb limit
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    },
}).single("coverImage"); //field name for the uploads file

module.exports=upload;