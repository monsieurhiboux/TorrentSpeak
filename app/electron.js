let electron = require('electron')

electron.app.on("ready", function () {
  var main = new electron.BrowserWindow({width: 530, height: 700});
  main.on("closed", electron.app.quit);
  main.webContents.openDevTools();
  main.loadURL("http://127.0.0.1:3000/");
});
