const fs = require('fs');
const path = require('path');

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    // 如果文件存在，先判断是文件还是目录
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      // 如果是文件，直接删除
      fs.unlinkSync(filePath);
      console.log(`已删除文件 ${filePath}`);
    } else {
      // 如果是目录，遍历目录中的文件和子目录，并递归调用 deleteFile 函数
      fs.readdirSync(filePath).forEach(file => {
        const curPath = path.join(filePath, file);
        deleteFile(curPath);
      });
      // 删除空目录
      fs.rmdirSync(filePath);
      console.log(`已删除目录 ${filePath}`);
    }
  } else {
    console.log(`文件或目录 ${filePath} 不存在`);
  }
}

// 示例：删除 /path/to/dir 中所有名为 test.txt 的文件
const startPath = '/Users/zhangtao/Documents/前端调试通关秘籍';
const targetFile = 'style_https.1.5.8.css';

function deleteTargetFile(startPath, targetFile) {
  debugger
  if (!fs.existsSync(startPath)) {
    console.log(`路径 ${startPath} 不存在`);
    return;
  }

  if (fs.statSync(startPath).isDirectory()) {
    fs.readdirSync(startPath).forEach(file => {
      const curPath = path.join(startPath, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteTargetFile(curPath, targetFile);
      } else if (file === targetFile) {
        deleteFile(curPath);
      }
    });
  } else if (startPath.endsWith(targetFile)) {
    deleteFile(startPath);
  }
}

deleteTargetFile(startPath, targetFile);
