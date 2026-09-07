const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(
    __dirname,
    "..",
    "uploads"
);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true,
    });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const extension = path.extname(
            file.originalname
        );

        const filename =
            `cover-${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}${extension}`;

        cb(null, filename);
    },
});
function checkFileType(file, cb) {
    const allowedExtensions =
        /jpeg|jpg|png|gif|webp/;

    const extensionValid =
        allowedExtensions.test(
            path.extname(
                file.originalname
            ).toLowerCase()
        );

    const mimeTypeValid =
        allowedExtensions.test(
            file.mimetype
        );

    if (
        extensionValid &&
        mimeTypeValid
    ) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Images only! jpeg, jpg, png, gif, webp"
            )
        );
    }
}

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: function (
        req,
        file,
        cb
    ) {
        checkFileType(file, cb);
    },
}).single("cover");

module.exports = upload;