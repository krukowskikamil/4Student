import React from 'react';

import './style.scss';

class Classes extends React.Component {
    constructor(props){
        super(props);
        this.sendDeleteClass = this.sendDeleteClass.bind(this);
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
    
    render(){
        
        return(
            <>
                    <h1>Notatki</h1>
                    {
                    this.state.classes.map((element) => {
                        return <div key={element.class_id}>{element.teacher}/{element.className}
                         <button key={element.class_id} onClick={() => this.sendDeleteClass(element.class_id)}>kosz</button>
                         </div>
                    })
                    }

            </>
        )
    }
}

export default Classes;