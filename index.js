const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

let data = [{name: 'Messi', weight: 63, height: 163, date: '1986-06-09', status: true}]

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index',{nama: data}))
app.get('/add', (req, res) => res.render('add'))
app.post('/add', (req, res) => {
    data.push({name: req.body.name, weight: req.body.weight, height: req.body.height, date: req.body.date, status: req.body.status})
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    let index = req.params.id
    data.splice(index, 1)
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    let index = req.params.id
    res.render('edit', {nama: data[index]})
   
})

app.post('/edit/:id', (req, res) => {
    let index = req.params.id
    data[index] = {name: req.body.name, weight: req.body.weight, height: req.body.height, date: req.body.date, status: req.body.status}
    res.redirect('/')
})

app.listen(3000, () => {
    console.log(`web ini berjalan di port 3000!`)
})