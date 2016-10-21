let express = require('express')
let app = express()
let sassMiddleware = require('node-sass-middleware')
let path = require('path');
let http = require('http').Server(app);
let io = require('socket.io')(http)

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

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
