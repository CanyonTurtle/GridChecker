//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/Grids');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach

    var data = "";
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        data += "\n" + (file); 
    });

    data = data.slice(1)
    fs.writeFile("public/grid-manifest.txt", data, (err) => {
      if (err) console.log(err);
        // console.log("Successfully Written to File.");
    })
});
