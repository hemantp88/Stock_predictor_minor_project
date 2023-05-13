const fs = require('fs');
const filePath = 'A';

check_image=(file_name)=>{
    if (fs.existsSync(`../output/${file_name}.png`)) {
        console.log('The file exists.');
        return true;
    } else {
        console.log('The file does not exist.');
        return false;
    }
}

check_image(filePath)
