import React from 'react';
import SvgIcon from '../svgIcon';

import './style.scss';

class Notepad extends React.Component{
    constructor(props){
        super(props);
        this.sendDeleteNote = this.sendDeleteNote.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
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
    changeEdit(id){
        this.props.changeHandler('Edit','Notepad',id);
    }
    
    render(){
        
        return(
            <>
                    <h1>Notatki</h1>
                    <div className="element-con">
                    {
                    this.state.notes.map((element) => {
                        return <div className="element" key={element.note_id}>{element.title}/{element.text}
                        <div className="trash" onClick={() => this.sendDeleteNote(element.note_id)}><SvgIcon name="trash" /></div>
                        <div className="pen" onClick={() => this.changeEdit(element.note_id)}><SvgIcon name="pen"/></div>
                        </div>
                    })
                    }
                    </div>
            </>
        )
    }

}

export default Notepad;