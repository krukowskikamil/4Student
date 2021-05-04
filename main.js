const {app, BrowserWindow, ipcMain, Notification} = require("electron")
const path = require('path')
const Api = require('./src/Api')
const { title } = require("process")

let win;

function createWindowFunction() {
    win = new BrowserWindow({
        title: '4Student',
        frame: true,
        minHeight: 800,
        minWidth: 800,
        icon: path.join(__dirname, 'icon.jpg'),
        webPreferences:{
            
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname,'preload.js')
        }
    })

    win.loadFile('index.html')
    //win.webContents.openDevTools()

    
}

require('electron-reload')(__dirname,{
    electron: path.join(__dirname,'node modules','.bin','electron')
})

app.whenReady().then(createWindowFunction)

ipcMain.on('exit-signal', () => {
    const myNotification = new Notification({
        title: 'Closing... ',
        body: 'bye bye !'
    }).show();

    app.quit();
      
})

ipcMain.on('max-signal', () => {
    if(win.isMaximized()){
        win.unmaximize()
    }else{
        win.maximize()
    }
})

ipcMain.on('min-signal', () => {
    win.minimize()
})

ipcMain.on('full-screen-signal', () => {
    //zmienic na pełny ekran
    if(win.webContents.isDevToolsOpened()){
        win.webContents.closeDevTools();
    }else{
        win.webContents.openDevTools();
    }
})

const api = new Api();

ipcMain.on('data', (event ,arg) => {
    api.writeStartDate(arg.day, arg.month, arg.year)
})