import React, { Component } from 'react';
import './App.css';

import ChannelList from './components/ChannelList'
import ChannelInfo from './components/ChannelInfo'
import FetchChannelDataForm from './components/FetchChannelDataForm'

class App extends Component {
    constructor () {
        super();

        this.state = {
        	channelId: null,
        	selectedChannel: undefined
        }
    }

    onNewChannelId (channelId) {
    	this.setState({
    		channelId
    	})
    }

    onChannelSelected (selectedChannel) {
    	this.setState({
    		selectedChannel
    	})
    }

    render() {
        return (
            <div className="container">
                <FetchChannelDataForm onNewChannelId={this.onNewChannelId.bind(this)}/>

            	<ChannelInfo channel={this.state.selectedChannel}/>
            	
            	<ChannelList onChannelSelected={this.onChannelSelected.bind(this)}/>
            </div>
        );
    }
}

export default App;
