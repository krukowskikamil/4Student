import { ipcRenderer } from 'electron';
import React from 'react';
import SvgIcon from '../svgIcon';

import './style.scss';

class Events extends React.Component {
    constructor(props){
        super(props);
        this.sendDeleteEvent = this.sendDeleteEvent.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
    }
    state = {
        events: []
    }

    componentDidMount(){
        ipcRenderer.send('request-events')
        ipcRenderer.on('events-sender', (event, arg) => {
            this.setState({events: arg});
        })
    }

    sendDeleteEvent(id){
        ipcRenderer.send('delete-event',id);
    }
    changeEdit(id){
        this.props.changeHandler('Edit','Event',id);
    }

    render(){
        
        return(
            <>
                    <h1>Wydarzenia</h1>
                    <div className="element-con">
                    {
                    this.state.events.map((element) => {
                        return <div className="element" key={element.event_id}>{element.date}/{element.title}/{element.note}
                        <div className="trash" onClick={() => this.sendDeleteEvent(element.event_id)}><SvgIcon name="trash" /></div>
                        <div className="pen" onClick={() => this.changeEdit(element.event_id)}><SvgIcon name="pen"/></div>
                        </div>
                    })
                    }
                    </div>
            </>
        )
    }
}

export default Events;