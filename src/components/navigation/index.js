import React from 'react';
import SvgIcon from '../svgIcon/index';

import './style.scss';

class Navigation extends React.Component{
    constructor(props){
        super(props);       
        this.changeNotepad = this.changeNotepad.bind(this);
        this.changeCalendar = this.changeCalendar.bind(this);
        this.changeExam = this.changeExam.bind(this);
        this.changeClass = this.changeClass.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
        this.changeAdd = this.changeAdd.bind(this);
    }

    changeNotepad() {
        this.props.changeHandler('Notepad');
    }
    changeCalendar() {
        this.props.changeHandler('Calendar');
    }
    changeExam() {
        this.props.changeHandler('Exam');
    }
    changeClass() {
        this.props.changeHandler('Class');
    }
    changeEvent() {
        this.props.changeHandler('Event');
    }
    changeAdd() {
        this.props.changeHandler('Add');
    }
    

    render(){
        return(
            <div className='navigation-menu'>
                <ul>
                    <li onClick = {this.changeCalendar}>
                        Kalendarz
                    </li>
                    <li onClick = {this.changeClass}>
                        Przedmioty
                    </li>
                    <li onClick = {this.changeExam}>
                        Egzaminy
                    </li>
                    <li onClick = {this.changeNotepad}>
                        Notatki
                    </li>
                    <li onClick = {this.changeEvent}>
                        Wydarzenia
                    </li>
                </ul>
                
                <div className="add-button-con">
                <button className="add-button" onClick={this.changeAdd}> <SvgIcon name = 'plus'/> </button>
                </div>
            </div>
            
        )
    }
}

export default Navigation;