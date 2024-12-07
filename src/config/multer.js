const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists with user-specific subdirectories
const createUserUploadDir = (userId, title) => {
  const userUploadDir = path.join(__dirname, 'uploads', userId, title);
  if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
    console.log(`Created user upload directory: ${userUploadDir}`);
  }
  return userUploadDir;
};

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure userId is passed correctly
    const userId = req.body.userId || 'unknown';
    const title = req.body.title || 'untitled';
    const userUploadDir = createUserUploadDir(userId, title);
    cb(null, userUploadDir);
  },
  filename: (req, file, cb) => {
    // Ensure userId and title are handled properly

    const title = req.body.title || 'untitled';
    const userId = req.body.userId || 'unknown';

    const sanitizedTitle = title.replace(/\s+/g, '_');
    const fileExt = path.extname(file.originalname);
    const timestamp = Date.now(); // Add timestamp to ensure unique filenames
    cb(null, `${userId}_${sanitizedTitle}_${timestamp}${fileExt}`);
  },
});

// File filter to allow specific file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['application/pdf'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Unsupported file type: ${file.mimetype}. Allowed types are JPEG, PNG, PDF, GIF, and WebP.`
      ),
      false
    );
  }
};

// Limits for file size and fields
const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB file size limit
  files: 10, // Allow up to 5 files per request
};

// Multer upload instance for multiple files
const upload = multer({
  storage,
  fileFilter,
  limits,
});

// Middleware to handle multiple file uploads
const uploadMiddleware = (req, res, next) => {
  try {
    const multipleUpload = upload.array('files', 10);
    multipleUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({
          success: false,
          message: `Multer error: ${err.message}`,
        });
      } else if (err) {
        // Custom or other errors
        console.error(err);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      // Check if files exist in the request
      if (!req.files || req.files.length === 0) {
        req.uploadedFiles = [];
        return next(); // Proceed without uploaded files
      }

      req.uploadedFiles = req.files;
      next();
    });
  } catch (error) {
    console.error(error);
    next(error); // Forward the error to the global error handler
  }
};

module.exports = {
  uploadMiddleware,
};
