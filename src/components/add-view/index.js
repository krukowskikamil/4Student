import React from 'react';
import SvgIcon from '../svgIcon';

import './style.scss';

class Add extends React.Component {
    constructor(props){
        super(props);
        this.changeCalendar = this.changeCalendar.bind(this);
        this.sendDataToSave = this.sendDataToSave.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.changeNoteTitle = this.changeNoteTitle.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.changeTeacher = this.changeTeacher.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }
    
    state ={ 
        type: "Egzamin",
        title: "",
        text: "",
        class: "",
        note_title: "",
        note: "",
        teacher: "",
        date:""
    }

    
    changeType(event) {
        this.setState({type: event.target.value});
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
    changeCalendar() {
        this.props.changeHandler('Calendar');
    }
    
    sendDataToSave(data){
        if(this.state.type == "Wydarzenie"){
            data = { 
                title: this.state.title,
                date: this.state.date,
                note: this.state.text
            }
            ipcRenderer.send('event', data);
        }else if(this.state.type == "Egzamin"){
            data = { 
                date: this.state.date,
                class: this.state.class
            }
            ipcRenderer.send('exam', data);
        }else if(this.state.type == "Przedmiot"){
            data = { 
                class: this.state.class,
                teacher: this.state.teacher
            }
            ipcRenderer.send('class', data);
        }else if(this.state.type == "Notatka"){
            data = { 
                note_title: this.state.note_title,
                note: this.state.note
            }
            ipcRenderer.send('note', data);
        }   
    }
    

    render() {
        return(
        <div className="add-view-con">
        <form onSubmit={this.sendDataToSave}>
            <h1>
            Co chcesz dodac? :)) <br></br>
            <select value={this.state.value} onChange={this.changeType}>
                <option value="Egzamin">Egzamin</option>
                <option value="Wydarzenie">Wydarzenie</option>
                <option value="Notatka">Notatka</option>
                <option value="Przedmiot">Przedmiot</option>
            </select>
            
            {this.state.type == "Wydarzenie" ? 
            (
                <>
                    <br></br>
                    <div className="icon"><SvgIcon name = "event" /></div>
                    <label>Tytu??: </label>
                    <input type="text" onChange={this.changeTitle}></input>
                    
                    <br></br>
                    <label>Notatka: </label>
                    <input type="text" onChange={this.changeText}></input>
                    <br></br>
                    <label>Data:</label>
                    <input type="date" onChange={this.changeDate}></input>
                </>
            ) : ""}
            {this.state.type == "Egzamin" ?
            (
                <>
                    <br></br>
                    <div className="icon"><SvgIcon name = "exam" /></div>
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.changeClass}></input>
                    <br></br>
                    <label>Data:</label>
                    <input type="date" onChange={this.changeDate}></input>
                </>
            ) : ""}
            {this.state.type == "Notatka" ?
            (
                <>
                    <br></br>
                    <div className="icon"><SvgIcon name = "note" /></div>
                    <label>Tytu??: </label>
                    <input type="text" onChange={this.changeNoteTitle}></input>
                    <br></br><br></br>
                    <label>Tre????: </label>
                    <textarea rows="3" cols="60" name="text" form="addform" onChange={this.changeNote}>Miejsce na notatk??...</textarea>
                </>
            ) : ""}
            {this.state.type == "Przedmiot" ?
            (
                <>
                    <br></br>
                    <div className="icon"><SvgIcon name = "class" /></div>
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.changeClass}></input>
                    <br></br>
                    <label>Nauczyciel: </label>
                    <input type="text" onChange={this.changeTeacher}></input>
                </>
            ) : ""}
            <br></br>
            </h1>
            <button id="save"type="submit" value="Zapisz">Zapisz</button>
            <br/>
        </form>
        </div>
        )
    }
}

export default Add;