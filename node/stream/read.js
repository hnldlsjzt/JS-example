const fs = require('fs')

const rs = fs.createReadStream('./sample.txt', {

})

rs.on('data', function (chunk) {
    // t
    console.log('chunk: ', chunk, chunk.toString('utf-8'));

})

rs.on('end', function (chunk) {
    console.log('end: ', chunk);
})

rs.on('error', function (error) {
    console.log('error: ', error);
})