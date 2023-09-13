const fs = require('fs')

const ws1 = fs.createWriteStream('./sample.txt', {
    flags: 'a'
})

ws1.write('使用stream写数据 \n')
ws1.write('end')
// 以 end 结尾，end 后面还 write 就会报错
ws1.end()

