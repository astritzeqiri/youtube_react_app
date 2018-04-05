import React, { Component } from 'react';

import Firebase from '../services/Firebase'

export default class ChannelList extends Component {
  
	constructor (props) {
		super(props);

		this.state = {
			channels: [],
			loading: true
		}

	    let app = Firebase.database().ref('youtubeChannels');
	    app.on('value', snapshot => {
	      	if (snapshot.val()) {
		      	this.setState({
		      		channels: Object.values(snapshot.val()),
		      		loading: false
		      	})
		      	return;
	      	}

	      	this.setState({
	      		loading: false
	      	})
	    });
	}

	viewChannel (channel) {
		if (typeof this.props.onChannelSelected == 'function') {
			this.props.onChannelSelected(channel)
		}
	}

	render() {
		return (
			<div>
				{	
					this.state.loading && 
					<span>Loading movies...</span>
				}
				{	
					!this.state.loading && 
					<ul>
						{this.state.channels.map(channel => {
							return (
								<li>
									Id: {channel.channelId}<br />
									Name: {channel.channelName}<br />
									Title: {channel.channelTitle} <br />
									<a href="javascript:void(0)" onClick={this.viewChannel.bind(this, channel)}>View info</a>
								</li>
							)
						})}
					</ul>
				}
			</div>
		);
	}
}
