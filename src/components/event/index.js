import { ipcRenderer } from 'electron';
import React from 'react';

import './style.scss';

class Events extends React.Component {
    constructor(props){
        super(props);
        this.sendDeleteEvent = this.sendDeleteEvent.bind(this);
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
    
    render(){
        
        return(
            <>
                    <h1>Wydarzenia</h1>
                    {
                    this.state.events.map((element) => {
                        return <div key={element.event_id}>{element.date}/{element.title}/{element.note}
                        <button key={element.event_id} onClick={() => this.sendDeleteEvent(element.event_id)}>kosz</button>
                        </div>
                    })
                    }

            </>
        )
    }
}

export default Events;