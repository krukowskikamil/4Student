import React from 'react';

import './style.scss';

class Notepad extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className='notepad-conteiner'>
                {/* <textarea value = 'Note here!'> </textarea> */}
                Notatnik
            </div>
        )
    }

}

export default Notepad;