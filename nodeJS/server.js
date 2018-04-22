const express = require('express')
const app = express()
const api = require('./easyWash.js')
//const compression = require('compression')

//app.use(compression)
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', async function (req, res) {
  json = await api.getData();
  console.log(json);

  res.render('index', {data: json})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
