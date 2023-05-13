const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const fs=require("fs")

const check_image=(file_name)=>{
    if (fs.existsSync(`C:/Users/panch/Documents/MINOR_PROJECT/backend/public/output/${file_name}.png`)) {
        console.log('The file exists.');
        return true;
    } else {
        console.log('The file does not exist.');
        return false;
    }
}


// ESSENTIAL MIDDLEWARES
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', function(req, res){
    res.writeHead(200).sendFile('/index.html');
});

app.get('/check_image/:name', function(req, res){
    const file_name=req.params["name"];
    console.log(file_name)
    if(check_image(file_name)) res.json({"isFound" : true})
    return res.json({"isFound" : false})
});

app.listen(port, () => {
    console.log("The server is up and running at port 5000");
})