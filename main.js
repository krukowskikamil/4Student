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

ipcMain.on('event', (event ,arg) => {
    api.writeEvent(arg.title, arg.date, arg.note)
})
ipcMain.on('exam', (event ,arg) => {
    api.writeExam(arg.date, arg.class)
})
ipcMain.on('note', (event ,arg) => {
    api.writeNote(arg.note_title, arg.note)
})
ipcMain.on('class', (event ,arg) => {
    api.writeClass(arg.teacher, arg.class)
})
ipcMain.on('data-by-date', (event, arg) => {
    data =[];
    data.push(api.getExamByDate(arg.year, arg.month, arg.day));
    data.push(api.getEventByDate(arg.year, arg.month, arg.day));
    event.reply('data-by-date-sender', data);
})

ipcMain.on('request-events', (event) => {
    data = api.getEvents();
    event.reply('events-sender', data);
})
ipcMain.on('request-classes', (event) => {
    data = api.getClasses();
    event.reply('classes-sender', data);
})
ipcMain.on('request-notes', (event) => {
    data = api.getNotes();
    event.reply('notes-sender', data);
})
ipcMain.on('request-exams', (event) => {
    data = api.getExams();
    event.reply('exams-sender', data);
})

ipcMain.on('delete-exam', (event,arg) => {
    api.deleteExam(arg);
})
ipcMain.on('delete-event', (event,arg) => {
    api.deleteEvent(arg);
})
ipcMain.on('delete-note', (event,arg) => {
    api.deleteNote(arg);
})
ipcMain.on('delete-class', (event,arg) => {
    api.deleteClass(arg);
})