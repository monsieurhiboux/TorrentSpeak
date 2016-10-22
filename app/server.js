let express = require('express')
let app = express()
let sassMiddleware = require('node-sass-middleware')
let path = require('path');
let http = require('http').Server(app);
let io = require('socket.io')(http)
let parseTorrent = require('parse-torrent')
let torrentStream = require('torrent-stream')
const username = require('username');

username().then(username => {
    pseudo = username
    //=> 'sindresorhus'
});

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

  socket.on('add magnet', function(msg){
    io.emit('add magnet', msg)
    let engine = torrentStream(msg,{
        'connections': 100,
        'path': '/Users/'+pseudo+'/Desktop'
    })
    engine.on('ready', function() {
        engine.files.forEach(function(file) {
            file.select()
        })
    })
    engine.on('download', function(){
      io.emit('edit dl')
    })
    engine.on('idle', function(){
      io.emit('end dl')
      engine.destroy()
    })
  })

  socket.on('disconnect', function(){
  })
});

http.listen(3000, function(){});
