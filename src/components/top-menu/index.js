import React from 'react';

import Clock from '../clock/Clock';
import SvgIcon from '../svgIcon/index';

import './style.scss';

const { ipcRenderer } = window.require("electron");

class TopMenu extends React.Component{
    constructor(props){
        super(props);
    }
    
    sendExitSignal(){
        ipcRenderer.send('exit-signal')
    }
    sendMaxSignal(){
        ipcRenderer.send('max-signal')
    }
    sendMinSignal(){
        ipcRenderer.send('min-signal')
    }
    sendFullScreenSignal(){
        ipcRenderer.send('full-screen-signal')
    }

    render() {
        return(
            <div className = 'top-menu-container'>
                <div className='left-side'>
                    <button id='full' onClick={this.sendFullScreenSignal}>
                        <SvgIcon name = 'full' />
                    </button>
                </div>
                <Clock/>
                <div className='right-side'>
                <button id='min' onClick={this.sendMinSignal}>
                    <SvgIcon name = 'min' />   
                </button>
                <button id='max' onClick={this.sendMaxSignal}>
                    <SvgIcon name = 'max' />
                </button>
                <button id='exit' onClick={this.sendExitSignal}>
                    <SvgIcon name = 'exit' />
                </button>
                </div>
            </div>
        )
    }
}

export default TopMenu;