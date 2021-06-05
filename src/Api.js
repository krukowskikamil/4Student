const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const {customAlphabet} = require('nanoid')

let db;
const nanoid = customAlphabet('1234567890',10);

class Api {
    constructor(){
        const dbPath = path.join(__dirname,'4Student.db');
        const adapter = new FileSync(dbPath);
        db = lowdb(adapter);
        db.defaults({ class:[], exam:[], note:[], event:[]}).write();
    }

    writeEvent(title, date, text){
        db.get('event').push({event_id: nanoid(), title: title, date: date, note: text}).write();
    }
    writeNote(title, text){
        db.get('note').push({note_id: nanoid(), title: title, text: text}).write();
    }
    writeExam(date, clas){
        db.get('exam').push({exam_id: nanoid(), date: date, class: clas}).write();
    }
    writeClass(teacher, className){
        db.get('class').push({class_id: nanoid(), teacher: teacher, class: className}).write();
    }

    getEvents(){
        return db.get('event').value();
    }
    getNotes(){
        return db.get('note').value();
    }
    getClasses(){
        return db.get('class').value();
    }
    getExams(){
        return db.get('exam').value();
    }
    getExamByDate(year, month, day){  
        if(db.get('exam').find({date: year+"-"+month+"-"+day}).value() == null){
            return {message: "empty"}
        }else{
            return  db.get('exam').find({date: year+"-"+month+"-"+day}).value();
        }    
    }
    getEventByDate(year, month, day){
        if(db.get('event').find({date: year+"-"+month+"-"+day}).value() == null){
            return {message: "empty"}
        }else{
            return  db.get('event').find({date: year+"-"+month+"-"+day}).value();
        }
    }

    deleteExam(id){
        db.get('exam').remove( { exam_id: id } ).write();
    }
    deleteEvent(id){
        db.get('event').remove( { event_id: id } ).write();
    }
    deleteNote(id){
        db.get('note').remove( { note_id: id } ).write();
    }
    deleteClass(id){
        db.get('class').remove( { class_id: id } ).write();
    }
}

module.exports = Api;