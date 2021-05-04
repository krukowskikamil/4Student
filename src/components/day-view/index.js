import React from 'react';

import './style.scss';

const { ipcRenderer } = window.require("electron");

const monthList= ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

class Day extends React.Component{
    constructor(props){
        super(props);
        this.changeCalendar = this.changeCalendar.bind(this);
        this.sendDataToSave = this.sendDataToSave.bind(this);
    }

    changeCalendar() {
        this.props.changeHandler('Calendar');
    }
    
    sendDataToSave(data){
        ipcRenderer.send('data', data);
    }
    render() {
        return(
        <div>
            Dzień {this.props.day} {monthList[this.props.month]} {this.props.year}
            <button onClick={this.changeCalendar}>wróć</button>
            <br/>
            <input type='text' className='text'placeholder='Test...' ></input>
            <button onClick={() => {
                this.sendDataToSave({day: this.props.day, month: monthList[this.props.month], year: this.props.year})
            }}>TEST BUTTON</button>
        </div>
        )
    }
}
export default Day;