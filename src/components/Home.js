import React, { Component } from 'react';

import ChannelList from './ChannelList'
import FetchChannelDataForm from './FetchChannelDataForm'

export default class Home extends Component {
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
	    	<div>
	            <FetchChannelDataForm onNewChannelId={this.onNewChannelId.bind(this)}/>
	        	
	    		<ChannelList />
	        </div>
        );
    }
}
