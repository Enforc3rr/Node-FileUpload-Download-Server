const mongoose = require("mongoose");
/*
Schema of the Uploaded File
file id
original file name
file extension name
new unique name of file (using uuid)
url from where file can be downloaded.
 */
const fileUploadSchema = new mongoose.Schema({
    originalFileName:{
        type: String,
        required : true,
    },
    fileExtension:{
        type: String ,
        required : true
    },

    newUniqueName:{
        type : String ,
        required : true ,
        unique : true
    },
    urlToDownloadFile:{
        type:String
    }
});
module.exports = mongoose.model("fileupload",fileUploadSchema);