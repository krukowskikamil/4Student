import React from 'react';

import './style.scss';

const dayList= ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const monthList= ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const monthListEN= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.changeDay = this.changeDay.bind(this);
        this.monthMinus = this.monthMinus.bind(this);
        this.monthPlus = this.monthPlus.bind(this);
        
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();

        this.state = {
            monthState: month,
            yearState: year
        }
    }
    
    state = {
        monthState: 0,
        yearState: 0
    }

    changeDay(day, month, year) {
        this.props.changeHandler('Day',day,month,year);
    }

    monthMinus(){
        if(this.state.monthState == 0){
            this.setState({monthState: 11, yearState: this.state.yearState - 1});
        }else{
            this.setState({monthState: this.state.monthState - 1});
        }
    }
    monthPlus(){
        if(this.state.monthState == 11){
            this.setState({monthState: 0, yearState: this.state.yearState + 1});
        }else{
            this.setState({monthState: this.state.monthState + 1});
        }
    }

    daysAmount(month){
        if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
            return 31;
        }else if(month == 3 || month == 5 || month == 8 || month == 10){
            return 30;
        }else{
            if(this.state.yearState%4 == 0 && this.state.yearState%400 != 0){
                return 29;
            }else{
                return 28;
            }
        }
    }
    
    render() {
        let first = new Date(monthListEN[this.state.monthState] + ' 1, ' + this.state.yearState + ' 23:59:59');
        let firstDay = first.getDay();
        let tab = [];
        for(let i = 0; i<firstDay;i++){
            tab.push(i);
        }
        let days = [];
        for(let i = 1; i<=this.daysAmount(this.state.monthState);i++){
            days.push(i);
        }
        return(
            <>
            <div className='calendar-navigation'>
                <button className= 'but' id='minus' onClick = {this.monthMinus}>
                    -
                </button>
                <div id='month'>{monthList[this.state.monthState]} / {this.state.yearState}</div>
                <button className= 'but' id='plus' onClick = {this.monthPlus}>
                    +
                </button>
            </div>
            <div className='week-day-conteiner'>
            {dayList.map(weekDay => {
                return <div className='week-day' key={weekDay.toString()}>{weekDay}</div>
            })}
            </div>
            
            <div className='calendar-conteiner'>
                {tab.map(day => {
                    return <div key={day.toString()}></div>
                })}
                {days.map(day => {
                    return <div className='day' key={day.toString()} onClick = {() => this.changeDay(day,this.state.monthState,this.state.yearState)}>{day}</div>
                })}
                
                
            </div>
            
            </>
        )
    }

}

export default Calendar;
