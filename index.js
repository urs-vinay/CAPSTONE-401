var app = require('express');
var express = require('express')
var app = express()
app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
var a = {
"name" :"Prashanth",
"age" :"23"
}
res.render('main',{result:a})
})
app.listen(3000, function () {
console.log('Example app listening on port 3000!')

})