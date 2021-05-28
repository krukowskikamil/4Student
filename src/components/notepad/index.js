import React from 'react';

import './style.scss';

class Notepad extends React.Component{
    constructor(props){
        super(props);
        this.sendDeleteNote = this.sendDeleteNote.bind(this);
    }
    state = {
        notes: []
    }

    componentDidMount(){
        ipcRenderer.send('request-notes')
        ipcRenderer.on('notes-sender', (event, arg) => {
            this.setState({notes: arg});
        })
    }
    
    sendDeleteNote(id){
        ipcRenderer.send('delete-note',id);
    }
    
    render(){
        
        return(
            <>
                    <h1>Notatki</h1>
                    {
                    this.state.notes.map((element) => {
                        return <div key={element.note_id}>{element.title}/{element.text}
                        <button key={element.note_id} onClick={() => this.sendDeleteNote(element.note_id)}>kosz</button>
                        </div>
                    })
                    }

            </>
        )
    }

}

export default Notepad;