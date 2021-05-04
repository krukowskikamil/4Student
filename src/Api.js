const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const {customAlphabet} = require('nanoid')

let db;
const nanoid = customAlphabet('1234567890',10);

class Api {
    constructor(){
        const dbPath = path.join(__dirname,'test.db');
        const adapter = new FileSync(dbPath);
        db = lowdb(adapter);
        db.defaults({ startDates: [], endDates:[]}).write();
        
    }

    writeStartDate(day, month, year){
        db.get('startDates').push({id: nanoid(), day: day, month: month, year: year}).write();
        console.log(db);
    }
    
    addNewDate(item){
        db.get('dates').push(item).write();
    }
}

module.exports = Api;