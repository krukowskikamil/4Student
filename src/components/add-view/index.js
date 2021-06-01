import React from 'react';

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
    }
    
    state ={ 
        type: "Egzamin",
        title: "",
        text: "",
        class: "",
        note_title: "",
        note: "",
        teacher: ""
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
    changeCalendar() {
        this.props.changeHandler('Calendar');
    }
    
    sendDataToSave(data){
        if(this.state.type == "Wydarzenie"){
            data = { 
                title: this.state.title,
                date: this.props.year + "-" + (this.props.month + 1) + "-" + this.props.day,
                note: this.state.text
            }
            ipcRenderer.send('event', data);
        }else if(this.state.type == "Egzamin"){
            data = { 
                date: this.props.year + "-" + (this.props.month + 1) + "-" + this.props.day,
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
            <label>
            Rodzaj wydarzenia: 
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
                    <label>Tytuł: </label>
                    <input type="text" onChange={this.changeTitle}></input>
                    
                    <br></br>
                    <label>Notatka: </label>
                    <input type="text" onChange={this.changeText}></input>
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                </>
            ) : ""}
            {this.state.type == "Egzamin" ?
            (
                <>
                    <br></br>
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.changeClass}></input>
                </>
            ) : ""}
            {this.state.type == "Notatka" ?
            (
                <>
                    <br></br>
                    <label>Tytuł: </label>
                    <input type="text" onChange={this.changeNoteTitle}></input>
                    <br></br>
                    <label>Treść: </label>
                    <input type="text" onChange={this.changeNote}></input>
                </>
            ) : ""}
            {this.state.type == "Przedmiot" ?
            (
                <>
                    <br></br>
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.changeClass}></input>
                    <br></br>
                    <label>Nauczyciel: </label>
                    <input type="text" onChange={this.changeTeacher}></input>
                </>
            ) : ""}
            <br></br>
            </label>
            <input type="submit" value="Zapisz" /> 
            <br/>
        </form>
        <button onClick={this.changeCalendar}>wróć</button>
        </div>
        )
    }
}

export default Add;