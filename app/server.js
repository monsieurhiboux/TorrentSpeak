let express = require('express')
let app = express()
let sassMiddleware = require('node-sass-middleware');
let path = require('path');

app.use(sassMiddleware({
    src: __dirname+'/scss',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix : '/static'
}))

app.use("/static", express.static('public'))

app.set('view engine', 'pug')

app.get('/', (request, response) =>{
  response.render('layouts/app', { title: 'Hey', message: 'Hello there!'})
})

app.listen(3000, () =>{
  console.log('Example app listening on port 3000!')
})
