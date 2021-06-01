import { ipcRenderer } from 'electron';
import React from 'react';

import './style.scss';

class Exam extends React.Component {
    constructor(props){
        super(props);
        this.sendDeleteExam = this.sendDeleteExam.bind(this);
    }
    state = {
        exams: []
    }

    componentDidMount(){
        ipcRenderer.send('request-exams')
        ipcRenderer.on('exams-sender', (event, arg) => {
            this.setState({exams: arg});
        })
    }
    sendDeleteExam(id){
        ipcRenderer.send('delete-exam',id);
    }

    
    render(){
        
        return(
            <>
                    <h1>Egzaminy</h1>
                    {
                    this.state.exams.map((element) => {
                        return (
                        <>
                        <div className="element" key={element.exam_id}>{element.class}/{element.date}
                        <button key={element.exam_id} onClick={() => this.sendDeleteExam(element.exam_id)}>kosz</button>
                        </div>
                        </>)
                        
                    })
                    }

            </>
        )
    }
}

export default Exam;