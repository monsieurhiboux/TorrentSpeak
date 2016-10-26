const express = require('express')
const app = express()
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http)
const parseTorrent = require('parse-torrent')
const torrentStream = require('torrent-stream')
const zipFolder = require('zip-folder')
const numeral = require('numeral')
const uniqId = function () {
  return Math.round(new Date().getTime() + (Math.random() * 100))
}
const rmdir = require('rimraf');
const bytes = function(num) {
  return numeral(num).format('0.0b');
}
const simples = function(num) {
  return numeral(num).format('0');
}

app.use("/static", express.static('public'))

app.set('view engine', 'pug')

app.get('/', (request, response) =>{
  rmdir('public/files/', function(error){});
  response.render('layouts/app', { title: 'TorrentSpeak'})
})

io.on('connection', function(socket){

  socket.on('add magnet', function(msg){

    parseTorrent.remote(msg, function (err) {

      if (err) {
        io.emit('error dl')
      }
      else{
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
          downloadLength = engine.swarm.downloaded
          totalLength = engine.files.reduce(function (prevLength, currFile) {return prevLength + currFile.length}, 0);
          var draw = simples(downloadLength* 100 / totalLength)
          var progress = bytes(downloadLength)+'/'+bytes(totalLength)
          io.emit('edit dl', progress, draw)
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
      }

    })


  })

  socket.on('disconnect', function(){
  })
})

http.listen(5555, function(){})
