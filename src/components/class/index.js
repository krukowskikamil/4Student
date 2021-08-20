import React from 'react';
import SvgIcon from '../svgIcon';

import './style.scss';

class Classes extends React.Component {
    constructor(props){
        super(props);
        this.sendDeleteClass = this.sendDeleteClass.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
    }
    state = {
        classes: []
    }

    componentDidMount(){
        ipcRenderer.send('request-classes')
        ipcRenderer.on('classes-sender', (event, arg) => {
            this.setState({classes: arg});
        })
    }

    sendDeleteClass(id){
        ipcRenderer.send('delete-class',id);
    }
    changeEdit(id){
        this.props.changeHandler('Edit','Class',id);
    }
    
    render(){
        
        return(
            <>
                    <h1>Przedmioty</h1>
                    <div className="element-con">
                    {
                    this.state.classes.map((element) => {
                        return <div className="element" key={element.class_id}>{element.teacher}/{element.class}
                        <div className="trash" onClick={() => this.sendDeleteClass(element.class_id)}><SvgIcon name="trash" /></div>
                        <div className="pen" onClick={() => this.changeEdit(element.class_id)}><SvgIcon name="pen"/></div>
                        </div>
                    })
                    }
                    </div>

            </>
        )
    }
}

export default Classes;