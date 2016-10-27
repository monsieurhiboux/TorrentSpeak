const express = require('express')
const siofu = require("socketio-file-upload")
const app = express()
const path = require('path')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const parseTorrent = require('parse-torrent')
const torrentStream = require('torrent-stream')
const zipFolder = require('zip-folder')
const numeral = require('numeral')
const uniqId = function () {
  return Math.round(new Date().getTime() + (Math.random() * 100))
}
const rmdir = require('rimraf')
const fs = require('fs')
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
  let uploader = new siofu()
  uploader.dir = "upload/"
  uploader.listen(socket)
  // Do something when a file is saved:
  uploader.on("saved", function(event){
      console.log(event.file.pathName)
      torrentFile = event.file.pathName
      var msg = parseTorrent(fs.readFileSync(torrentFile))
      parseTorrent.remote(msg, function (err) {

        if (err) {
          io.emit('error dl')
        }
        else{
          io.emit('add torrent')
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
                    fs.unlink(torrentFile)
                }
            })
            engine.destroy()
          })
        }
      })
  });
  // Error handler:
  uploader.on("error", function(event){
      io.emit('error dl')
      console.log("Error from uploader", event);
  });
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
