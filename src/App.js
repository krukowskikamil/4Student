import React from 'react';
import TopMenu from './components/top-menu/index';
import Navigation from './components/navigation/index';
import Calendar from './components/calendar/index';
import Notepad from './components/notepad/index';
import Exam from './components/exam/index';
import Class from './components/class/index';
import Event from './components/event/index';
import Day from './components/day-view/index';


let calendarDay, monthNum, yearNum;

class App extends React.Component {
    constructor(props){
        
        super(props);
        this.state = {
            topic: 'Calendar'
        }
    }

    changeTopic(newTopic){
        this.setState({topic: newTopic});
    }
    changeTopicDay(newTopic, day, month, year){
        this.setState({topic: newTopic});
        calendarDay = day;
        monthNum = month;
        yearNum = year;

    }

    render(){
        return(
        <>
            <TopMenu />
            {this.state.topic == 'Day' ? 
            (
                <Day changeHandler={this.changeTopic.bind(this)} day={calendarDay} month={monthNum} year={yearNum}/>
            ) 
            :
            (
                <>
                    <Navigation changeHandler={this.changeTopic.bind(this)}/>
                    {this.state.topic == 'Calendar' ? <Calendar changeHandler={this.changeTopicDay.bind(this)}/> : ''}
                    {this.state.topic == 'Notepad' ? <Notepad /> : ''}
                    {this.state.topic == 'Exam' ? <Exam /> : ''}
                    {this.state.topic == 'Event' ? <Event /> : ''}
                    {this.state.topic == 'Class' ? <Class /> : ''}
                    <button className="add-button">+</button>
                </>
            )}
            
        </>
        )
    }
}

export default App;