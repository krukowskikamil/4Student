import React from 'react';
import TopMenu from './components/top-menu/index';
import Navigation from './components/navigation/index';
import Calendar from './components/calendar/index';
import Notepad from './components/notepad/index';
import Exam from './components/exam/index';
import Class from './components/class/index';
import Event from './components/event/index';
import Day from './components/day-view/index';
import Edit from './components/edit-view/index';
import Add from './components/add-view/index';


let calendarDay, monthNum, yearNum, prevState, element_id;

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
    changeTopicEdit(newTopic, previousState, elem_id){
        this.setState({topic: newTopic});
        prevState = previousState;
        element_id = elem_id;
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
                    {this.state.topic == 'Notepad' ? <Notepad changeHandler={this.changeTopicEdit.bind(this)}/> : ''}
                    {this.state.topic == 'Exam' ? <Exam changeHandler={this.changeTopicEdit.bind(this)}/> : ''}
                    {this.state.topic == 'Event' ? <Event changeHandler={this.changeTopicEdit.bind(this)}/> : ''}
                    {this.state.topic == 'Class' ? <Class changeHandler={this.changeTopicEdit.bind(this)}/> : ''}
                    {this.state.topic == 'Add' ? <Add /> : ''}
                    {this.state.topic == 'Edit' ? <Edit changeHandler={this.changeTopic.bind(this)} preState={prevState} id={element_id}/> : ''}
                </>
            )}
        </>
        )
    }
}

export default App;