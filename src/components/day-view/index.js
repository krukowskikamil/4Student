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
        // this.checkTitleData = this.checkTitleData.bind(this);
        // this.checkTextData = this.checkTextData.bind(this);
        // this.checkClassData = this.checkClassData.bind(this);
    }
    
    state ={ 
        type: "Egzamin",
        title: "",
        text: "",
        class: "",
        warningTitle: false,
        warningText: false,
        warningClass: false,
        elements: []
    }
    componentDidMount(){
        let date = {
            year: this.props.year,
            month: this.props.month+1,
            day: this.props.day
        }
        ipcRenderer.send('data-by-date',date);
        ipcRenderer.on('data-by-date-sender', (event, arg) => {
            this.setState({elements: arg});
        })
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
            <h1>
            Co chcesz dodać? :))
            <br></br>
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
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                    <br></br>
                    <label>Notatka: </label>
                    <input type="text" onChange={this.changeText}></input>
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                </>
            )
            :
            (
                <>
                    <br></br>
                    <label>Przedmiot: </label>
                    <input type="text" onChange={this.changeClass}></input>
                    {this.state.warning == true ? <div>Pole nie może być puste</div>: <></>}
                </>
            )}
            <br></br>
            </h1>
            <button id="but1" type="submit" value="Zapisz">Zapisz</button> 
            <br/>
            <button id="but2" onClick={this.changeCalendar}>wróc</button>
        </form>
        {
            this.state.elements.map((element) => {
                return (
                    <> 
                    {element.message == "empty" ? 
                    (<>
                    </>)
                    :
                    (<>
                    {element.event_id == null ? 
                    (<>
                    <div className="element-" key={element.exam_id}>{element.date}/{element.class}
                    </div>
                    </>)
                    :
                    (<>
                    <div className="element-" key={element.event_id}>{element.date}/{element.title}/{element.note}
                    </div>
                        </>)}
                    </>)
                    }
                    </>
                    )
                    })
                }
        </div>
        )
    }
}
export default Day;