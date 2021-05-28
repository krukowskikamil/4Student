import React from 'react';

import './style.scss';

const { ipcRenderer } = window.require("electron");

const monthList= ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

class Day extends React.Component{
    constructor(props){
        super(props);
        this.changeCalendar = this.changeCalendar.bind(this);
        this.sendDataToSave = this.sendDataToSave.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        // this.changeDate = this.changeDate.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changeClass = this.changeClass.bind(this);
    }
    
    state ={ 
        type: "Egzamin",
        title: "",
        // date: "",
        text: "",
        class: ""
    }

    
    changeType(event) {
        this.setState({type: event.target.value});
    }
    changeTitle(event) {
        this.setState({title: event.target.value});
    }
    // changeDate(event) {
    //     this.setState({date: event.target.value});
    // }
    changeText(event) {
        this.setState({text: event.target.value});
    }
    changeClass(event) {
        this.setState({class: event.target.value});
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
        }else{
            data = { 
                date: this.props.year + "-" + (this.props.month + 1) + "-" + this.props.day,
                class: this.state.class
            }
            ipcRenderer.send('exam', data);
        }
    }

    render() {
        return(
        <div className="day-view-conteainer">
            <h1>Dzień {this.props.day} {monthList[this.props.month]} {this.props.year}</h1>
            
        <form onSubmit={this.sendDataToSave}>
            <label>
            Rodzaj wydarzenia: 
            <select value={this.state.value} onChange={this.changeType}>
                <option value="Egzamin">Egzamin</option>
                <option value="Wydarzenie">Wydarzenie</option>
            </select>
            {this.state.type == "Wydarzenie" ? 
            (
                <>
                    <br></br>
                    <label>Tytuł: </label>
                    <input type="text" onChange={this.changeTitle}></input>
                    <br></br>
                    {/* <label>Data wydarzenia: </label>
                    {(this.props.month + 1) > 9 ?
                    (
                        <>
                        {(this.props.day) > 9 ? 
                        (
                            <input type="date" value={this.props.year + "-" + (this.props.month + 1) + "-" + this.props.day} onChange={this.changeDate}></input>
                        )
                        :
                        (
                            <input type="date" value={this.props.year + "-" + (this.props.month + 1) + "-0" + this.props.day} onChange={this.changeDate}></input>
                        )
                        }
                        </>
                    )
                    :
                    (
                        <>
                        {(this.props.day) > 9 ? 
                        (
                            <input type="date" value={this.props.year + "-0" + (this.props.month + 1) + "-" + this.props.day} onChange={this.changeDate}></input>
                        )
                        :
                        (
                            <input type="date" value={this.props.year + "-0" + (this.props.month + 1) + "-0" + this.props.day} onChange={this.changeDate}></input>
                        )
                        }
                        </>                    )
                    }
                    <br></br> */}
                    <label>Notatka: </label>
                    <input type="text" onChange={this.changeText}></input>
                </>
            )
            :
            (
                <>
                    <br></br>
                    {/* <label>Data egzaminu: </label>
                    {(this.props.month + 1) > 9 ?
                    (
                        <>
                        {(this.props.day) > 9 ? 
                        (
                            <input type="date" value={this.props.year + "-" + (this.props.month + 1) + "-" + this.props.day} onChange={this.changeDate}></input>
                        )
                        :
                        (
                            <input type="date" value={this.props.year + "-" + (this.props.month + 1) + "-0" + this.props.day} onChange={this.changeDate}></input>
                        )
                        }
                        </>
                    )
                    :
                    (
                        <>
                        {(this.props.day) > 9 ? 
                        (
                            <input type="date" value={this.props.year + "-0" + (this.props.month + 1) + "-" + this.props.day} onChange={this.changeDate}></input>
                        )
                        :
                        (
                            <input type="date" value={this.props.year + "-0" + (this.props.month + 1) + "-0" + this.props.day} onChange={this.changeDate}></input>
                        )
                        }
                        </>                    )
                    }
                    <br></br> */}
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.changeClass}></input>
                </>
            )}
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
export default Day;