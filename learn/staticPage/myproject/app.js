var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var server = app.listen(3000, function () {
  console.log('Node.js web server at port 3000 is running..')
})
