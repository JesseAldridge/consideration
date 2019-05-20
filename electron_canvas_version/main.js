const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

app.once('ready', () => {
  window = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: "#fff",
    show: false
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    console.log('ready to show');
    window.webContents.openDevTools()
    window.show()
  })
})
