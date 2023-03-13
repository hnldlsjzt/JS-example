const fs = require('fs');
const path = require('path');

const directoryPath = '/Users/zhangtao/Documents/前端调试通关秘籍';
const filenameToDelete = 'c617de13771bff7ca1b7c864524be0c9';

fs.readdir(directoryPath, function (err, files) {
    console.log('files: ', files);
  if (err) {
    console.log('Unable to scan directory: ' + err);
    return;
  } 
  //检查每个文件，看它是否是要删除的文件
  files.forEach(function (file) {
    if (file === filenameToDelete) {
      //找到文件，删除
      const filePath = path.join(directoryPath, file);
      console.log('filePath: ', filePath);
    //   fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log(`File ${filePath} has been deleted.`);
    //   });
    }
  });
});
