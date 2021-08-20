import { ipcRenderer } from 'electron';
import React from 'react';
import SvgIcon from '../svgIcon';


import './style.scss';

class Edit extends React.Component {
    constructor(props){
        super(props);
        this.sendDataToSave = this.sendDataToSave.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.changeNoteTitle = this.changeNoteTitle.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.changeTeacher = this.changeTeacher.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }
    state = {
        title: "",
        text: "",
        class: "",
        note_title: "",
        note: "",
        teacher: "",
        date:""
    }

    componentDidMount(){
        if(this.props.preState == 'Exam'){
            ipcRenderer.send('get-exam-by-id', this.props.id);
            ipcRenderer.on('send-exam-by-id', (event,arg) => {
                this.setState({date: arg.date, class: arg.class});
            })
        }else if(this.props.preState == 'Event'){
            ipcRenderer.send('get-event-by-id', this.props.id);
            ipcRenderer.on('send-event-by-id', (event,arg) => {
                this.setState({title: arg.title, date: arg.date, note: arg.note});
            })
        }else if(this.props.preState == 'Class'){
            ipcRenderer.send('get-class-by-id', this.props.id);
            ipcRenderer.on('send-class-by-id', (event,arg) => {
                this.setState({class: arg.class, teacher: arg.teacher});
            })
        }else if(this.props.preState == 'Notepad'){
            ipcRenderer.send('get-note-by-id', this.props.id);
            ipcRenderer.on('send-note-by-id', (event,arg) => {
                this.setState({note_title: arg.title, text: arg.text});
            })
        }
    }

    changeTitle(event) {
        this.setState({title: event.target.value});
    }
    changeText(event) {
        this.setState({text: event.target.value});
    }
    changeClass(event) {
        this.setState({class: event.target.value});
    }
    changeNoteTitle(event) {
        this.setState({note_title: event.target.value});
    }
    changeNote(event) {
        this.setState({note: event.target.value});
    }
    changeTeacher(event) {
        this.setState({teacher: event.target.value});
    }
    changeDate(event) {
        this.setState({date: event.target.value});
    }

    sendDataToSave(data){
        if(this.props.preState == "Event"){
            data = { 
                title: this.state.title,
                date: this.state.date,
                note: this.state.note
            }
            ipcRenderer.send('event', data);
            ipcRenderer.send('delete-event',this.props.id);
        }else if(this.props.preState == "Exam"){
            data = { 
                date: this.state.date,
                class: this.state.class
            }
            ipcRenderer.send('exam', data);
            ipcRenderer.send('delete-exam',this.props.id);
        }else if(this.props.preState == "Class"){
            data = { 
                class: this.state.class,
                teacher: this.state.teacher
            }
            ipcRenderer.send('class', data);
            ipcRenderer.send('delete-class',this.props.id);
        }else if(this.props.preState == "Notepad"){
            data = { 
                note_title: this.state.note_title,
                note: this.state.text
            }
            ipcRenderer.send('note', data);
            ipcRenderer.send('delete-note',this.props.id);
        }   
    }

    render(){
        return(
            <div className="add-view-con">
            <form onSubmit={this.sendDataToSave}>
            <h1>
            {this.props.preState =="Exam" ? 
            (
                <>
                <br></br>
                    <div className="icon"><SvgIcon name = "exam" /></div>
                    <label>Przedmiot: </label>
                    <input type="text" value={this.state.class} onChange={this.changeClass}></input>
                    <br></br>
                    <label>Data:</label>
                    <input type="date" value={this.state.date} onChange={this.changeDate}></input>
                </>
            ) : ""
            }
            {this.props.preState =="Event" ? 
            (
                <>
                <br></br>
                    <div className="icon"><SvgIcon name = "event" /></div>
                    <label>Tytuł: </label>
                    <input type="text" value={this.state.title} onChange={this.changeTitle}></input>
                    
                    <br></br>
                    <label>Notatka: </label>
                    <input type="text" value={this.state.note} onChange={this.changeNote}></input>
                    <br></br>
                    <label>Data:</label>
                    <input type="date" value={this.state.date} onChange={this.changeDate}></input>
                </>
            ) : ""
            }
            {this.props.preState =="Class" ? 
            (
                <>
                <br></br>
                    <div className="icon"><SvgIcon name = "class" /></div>
                    <label>Przedmiot: </label>
                    <input type="text" value={this.state.class} onChange={this.changeClass}></input>
                    <br></br>
                    <label>Nauczyciel: </label>
                    <input type="text" value={this.state.teacher} onChange={this.changeTeacher}></input>
                </>
            ) : ""
            }
            {this.props.preState =="Notepad" ? 
            (
                <>
                <br></br>
                    <div className="icon"><SvgIcon name = "note" /></div>
                    <label>Tytuł: </label>
                    <input type="text" value={this.state.note_title} onChange={this.changeNoteTitle}></input>
                    <br></br><br></br>
                    <label>Treść: </label>
                    <textarea rows="3" cols="60" name="text" value={this.state.text} onChange={this.changeText}></textarea>   
                </>
            ) : ""
            }
            </h1>
            <br></br>
            <button id="save"type="submit" value="Zapisz">Zapisz</button>
            </form>
            </div>
        )
    }
}
export default Edit;