const { log } = require('console');
const express = require('express');
const fs = require('fs')
const app = new express()

// 直接返回版本。弊端：当文件体积大，网络又出现波动时，可能出现快下完了，出现失败的情况。又得重来
app.get('/download', (req, res) => {
    // 指定响应头，Content-Disposition，attachment 表示作为附件展示。
    // res.setHeader('Content-Disposition', 'attachment;filename="test.txt"')
    /**
     * 指定响应头，Content-Disposition，attachment 表示作为附件展示；inline 表示直接展示
     * 
     */
    res.setHeader('Content-Disposition', 'inline;filename="test.txt"')
    // 这里的内容，会做为附件的内容写进去
    res.send('hello world')
})
app.options('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Range')
    res.end('');
});


// 改进版，使用 http 的 Range 来获取和返回范围
app.get('/range-download', (req, res) => {
    console.log('range-download-req ', req['headers']?.['range']);

    // 允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 支持 Range 请求头
    res.setHeader('Access-Control-Allow-Headers', 'Range')
    // res.download 是读取文件内容返回，acceptRanges 选项为 true 就是会处理 range 请求（其实默认就是 true）。
    // res.download('index.txt', {
    //     acceptRanges: true
    // })
    res.end('');
})

// 下载图片
app.get('/image-download', (req, res) => {
    console.log('req: ', req['headers']?.['range']);
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.download('image.png')
})

// 写一个获取文件大小的接口
app.get('/file-size', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(fs.statSync('./image.png').size);
    // 这里要返回字符串
    res.end('' + fs.statSync('./image.png').size)
})
app.listen(3000, () => {
    console.log('server port: 3000');
})