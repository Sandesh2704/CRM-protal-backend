const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',  // Folder where images will be stored
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);  // Filename format: timestamp-originalname
    }
});

// File type validation (images only)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);  // Accept file
    } else {
        cb(new Error('Error: Only images are allowed!'));  // Reject file if not an image
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Set file size limit to 5MB
    fileFilter: fileFilter
});

module.exports = upload;

// const multer = require('multer');
// const path = require('path');

// // Set storage engine
// const storage = multer.diskStorage({
//     destination: './uploads/', 
//     filename: function(req, file, cb){
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // Initialize upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 50000000 }, 
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/; 
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = fileTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb('Error: Images only!');
//         }
//     }
// });

// module.exports = upload;

