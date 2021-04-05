const express = require("express");
const app = new express();
const multer = require("multer");
const cors = require("cors");
const databaseConfig = require("./configurations/databaseConfig");
const schema = require("./database/model");
const dotenv = require("dotenv");
dotenv.config({path:"./configurations/config.env"});

//Connecting To Database
databaseConfig();

//Using CORS
app.use(cors());

//Tell Multer Where And How To save File
const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./Files")
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});

//Max Size That Can Be Uploaded = 5 MegaBytes
const upload = multer({
    storage: fileStorageEngine,
    limits: {
        fileSize: 5*1024*1024
    }
});
/*
@desc To Upload The File
@Route POST /api/fileupload (key = pic)
*/
app.post("/api/fileupload",upload.single("pic"),((req, res) => {
    let fileExtension = req.file.mimetype.split("/")[1];
    schema.create({
        originalFileName:req.file.originalname,
        fileExtension: fileExtension,
        newUniqueName:req.file.filename,
        urlToDownloadFile:`http://localHost:8080/api/filedownload/${req.file.filename}`
    }).then(r => {
        res.json ({
            status:"ok",
            message : "file-uploaded",
            fileName:req.file.filename,
            downloadLink:`http://localHost:8080/api/filedownload/${req.file.filename}`
        });
    })
        .catch(e =>{
            res.status(400).json({
                status : "bad",
                message : "error while uploading file"
            });
        });
}));
/*
@desc To Download The Uploaded Image
@route GET /api/filedownload/:name
*/
app.get('/api/filedownload/:name',(req,res)=>{
    schema.findOne({
        newUniqueName : req.params.name
    })
        .then((data)=>{
            const {newUniqueName} = data;
            res.download(`${__dirname}/Files/${newUniqueName}`);
        })
        .catch(()=>{
            res.status(400).json({
                status : "bad",
                message : "error while uploading file"
            });
        });
});

const PORT = process.env.PORT || 8080 ;
app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`));