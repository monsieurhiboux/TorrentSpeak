let express = require('express')
let app = express()

app.set('view engine', 'pug');

app.get('/', (request, response) =>{
  response.render('layouts/app', { title: 'Hey', message: 'Hello there!'});
})

app.listen(3000, () =>{
  console.log('Example app listening on port 3000!')
})
