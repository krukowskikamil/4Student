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
        this.changeText = this.changeText.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.checkTitleData = this.checkTitleData.bind(this);
        this.checkTextData = this.checkTextData.bind(this);
        this.checkClassData = this.checkClassData.bind(this);
    }
    
    state ={ 
        type: "Egzamin",
        title: "",
        text: "",
        class: "",
        warningTitle: false,
        warningText: false,
        warningClass: false
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
    // checkTitleData(){
    //     if(this.state.title ==="")
    //         this.setState({warningTitle: true})
    // }
    // checkTextData(){
    //     if(this.state.text ==="")
    //         this.setState({warningText: true})
    // }
    // checkClassData(){
    //     if(this.state.class ==="")
    //         this.setState({warningClass: true})
    // }
    

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
                    <input type="text" onChange={this.changeTitle} onChange={this.checkTitleData}></input>
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                    <br></br>
                    <label>Notatka: </label>
                    <input type="text" onChange={this.changeText} onChange={this.checkTextData}></input>
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                </>
            )
            :
            (
                <>
                    <br></br>
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.checkClassData} onChange={this.checkData}></input>
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                </>
            )}
            <br></br>
            </label>
            <input type="submit" value="Zapisz" /> 
            <br/>
        </form>
        </div>
        )
    }
}
export default Day;