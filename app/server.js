let express = require('express')
let app = express()
let path = require('path');
let http = require('http').Server(app);
let io = require('socket.io')(http)
let parseTorrent = require('parse-torrent')
let torrentStream = require('torrent-stream')
let zipFolder = require('zip-folder')
let uniqId = function () {
  return Math.round(new Date().getTime() + (Math.random() * 100))
}
let rmdir = require('rimraf');


app.use("/static", express.static('public'))

app.set('view engine', 'pug')

app.get('/', (request, response) =>{
  rmdir('public/files/', function(error){});
  response.render('layouts/app', { title: 'TorrentSpeak'})
})

io.on('connection', function(socket){

  socket.on('add magnet', function(msg){
    io.emit('add magnet', msg)
    let id = uniqId()
    let engine = torrentStream(msg,{
        'connections': 100,
        'path': './public/files/'+id
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
      zipFolder('./public/files/'+id, './public/files/'+id+'.zip', function(err) {
          if(err) {
          } else {
              io.emit('end dl', './static/files/'+id+'.zip')
          }
      })
      engine.destroy()
    })
  })

  socket.on('disconnect', function(){
  })
})

http.listen(5555, function(){})
