const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination:function(req, file, cb) {
    cb(null, "uploads");
  },
  filename:function(req, file, cb) {
    const { originalname } = file;
    /*
      Replace any space in the file with - and convert to lowercase
    */
    const splitName = originalname.split(" ");
    const formattedName = splitName.join("-").toLowerCase();
    cb(null, `hey-${formattedName}`); 
  }
});

//cb(null, `${req.params.uuid}-${originalname}`); 

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  console.log(ext);
  if(ext !== ".jpg" || ext !== ".jpeg" || ext !== ".png" || ext !== ".mp4" || ext !== ".webp" || ext !== ".pdf" || ext !== ".docx" || ext !== ".doc") {
    cb(new Error("incorrect file type"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage
});

module.exports = upload;
