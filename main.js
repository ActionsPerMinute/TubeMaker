const {Menu} = require('electron')
const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 270, height: 163})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  if (process.platform === 'darwin') {
    var template = [{
      label: 'FromScratch',
      submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() { app.quit(); }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }]
    }];
    var osxMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(osxMenu);
    }
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  //if (process.platform !== 'darwin') {
    app.quit()
  //}
})




app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
