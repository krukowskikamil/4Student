import { ipcRenderer } from 'electron';
import React from 'react';
import SvgIcon from '../svgIcon';

import './style.scss';

class Exam extends React.Component {
    constructor(props){
        super(props);
        this.sendDeleteExam = this.sendDeleteExam.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
    }
    state = {
        exams: []
    }

    componentDidMount(){
        ipcRenderer.send('request-exams');
        ipcRenderer.on('exams-sender', (event, arg) => {
            this.setState({exams: arg});
        })
    }
    sendDeleteExam(id){
        ipcRenderer.send('delete-exam',id);
    }
    changeEdit(id){
        this.props.changeHandler('Edit','Exam',id);
    }
    
    render(){
        
        return(
            <>
                    <h1>Egzaminy</h1>
                    <div className="element-con">
                    {
                    this.state.exams.map((element) => {
                        return (
                        <>
                        <div className="element" key={element.exam_id}>{element.class}/{element.date}
                        <div className="trash" onClick={() => this.sendDeleteExam(element.exam_id)}><SvgIcon name="trash" /></div>
                        <div className="pen" onClick = {() => this.changeEdit(element.exam_id)}><SvgIcon name="pen"/></div>
                        </div>
                        </>)
                        
                    })
                    }
                    </div>
            </>
        )
    }
}

export default Exam;