let electron = require('electron')

require('electron-context-menu')({
    prepend: params => []
});

electron.app.on("ready", function () {
  var main = new electron.BrowserWindow({width: 530, height: 700, resizable: false, fullscreenable: false});
  main.on("closed", electron.app.quit);
  //main.webContents.openDevTools();
  main.loadURL("http://127.0.0.1:3000/");
  // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}
    ];

    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));
});
