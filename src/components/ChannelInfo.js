import React, { Component } from 'react';

import Firebase from '../services/Firebase'
import SubscriberCount from './SubscriberCount'

export default class ChannelInfo extends Component {
    constructor (props) {
        super(props);
    }

    onChannelIdChanged () {
    	this.fetchChannelData()
    }

    fetchChannelData () {
	    let app = Firebase.database().ref('youtubeChannels');

	    app
	    .orderByChild("channelId")
	    .equalTo(this.props.channelId)
	    .on('value', snapshot => {
	      	var vals = Object.values(snapshot.val());

	      	if (vals.length > 0) {
	      		this.setState({
	      			channel: vals[0]
	      		})
	      	}
	    });
    }

    render() {
        return (
            <div>
        		{
        			this.props.channel &&
            		<span>
            			Id: {this.props.channel.channelId} <br />
            			Name: {this.props.channel.channelName} <br />

                		<SubscriberCount channelId={this.props.channel.channelId} />
            		</span>	
            	}
            </div>
        );
    }
}
