const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/js/logic.js',function(req,res){
   res.sendFile(path.join(__dirname + '/js/logic.js'));
});

app.get('docs/rice.png', function(req, res) {
    console.log("what is happening");
    res.sendFile(path.join(__dirname+ '/docs/rice.png'));
});

app.get('question1', function(req, res) {
    req.POST.iteritems()
})

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/admin.ejs', function (req, res) {
  res.render('admin');
})

app.get('/puzzles', function (req, res) {
  res.render('puzzles');
})

app.post('/', function (req, res) {
  console.log(req.body.city);
  res.render('index');
})

app.listen(process.env.PORT || 3000)
