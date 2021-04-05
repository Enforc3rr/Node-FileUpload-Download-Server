# File Upload And Download Server
A Server Made Using Node.JS and MongoDB Which Will Handle File Upload And Download

## End Points
###### To Upload A File -> POST host/api/fileupload
###### To Download A File -> GET host/api/filedownload/:uniquename

![Working](Fileupload-Download.gif)

### Schema Of Uploaded File
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
### Model In Database
id:606a93dac0a78224b85fc8e3  
originalFileName:"3kl5xwskjij51.jpg"  
fileExtension:"jpeg"   
newUniqueName:"1617597402111-3kl5xwskjij51.jpg"   
urlToDownloadFile:"http://localHost:8080/api/filedownload/1617597402111-3kl5xwskjij51.jpg"   

### Dependecies Used 
1) Express
2) Multer
3) Mongoose
4) Dotenv
5) CORS


