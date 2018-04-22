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
  let machines = json['result']['body']['objekt']['raum']['maschinen']
  let trockner = []
  let waschmaschienen = []
  for (i in machines) {
    if (machines[i]['typ'] == 'Waschmaschine')
      waschmaschienen.push(machines[i])
    if (machines[i]['typ'] == 'Trockner')
      trockner.push(machines[i])
  }
  res.render('index', {waschmaschienen: waschmaschienen, trockner: trockner})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
