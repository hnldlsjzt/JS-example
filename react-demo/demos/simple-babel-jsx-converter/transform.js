const fs = require('fs');
const babel = require('@babel/core');

// 第一步读取内容
fs.readFile('./element.js', 'utf8', (err, data) => {
    // if (err) {
    //     throw new Error(err);
    //     return
    // }
    const code = data.toString('utf-8');
    // 第二步，转换
    const result = babel.transformSync(code, {
        plugins: ['@babel/plugin-transform-react-jsx']
    })
    console.log('result.code: ', result.code);
    // 第三步，重新生成文件
    //  fs.writeFile 写文件时，发现文件不存在，也自动创建。有文件就会覆盖内容
    fs.writeFile('./new-element.js', result.code,function () { })

})
