const fs = require('fs')

const ws1 = fs.createWriteStream('./sample.txt', 'utf-8')

ws1.write('使用stream写数据 \n')
ws1.write('end')