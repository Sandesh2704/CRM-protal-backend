const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 }, 
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; 
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

module.exports = upload;