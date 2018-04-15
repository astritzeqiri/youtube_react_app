import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Firebase from '../services/Firebase'

export default class ChannelList extends Component {
  
	constructor (props) {
		super(props);

		this.state = {
			channels: [],
			loading: true
		}

	}

	componentDidMount () {
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
		      	<h1 className="my-4">Channels</h1>
				{	
					this.state.loading && 
					<span>Loading channels...</span>
				}
				<div className="row">
					{! this.state.loading && this.state.channels.map(channel => {
						return (
							<div className="col-lg-4 col-sm-6 text-center mb-4">
					          	<Link to={'/channels/' + channel.channelId}>
					          		<img className="rounded-circle channel-image img-fluid d-block mx-auto" src={channel.thumbnail} />
					          		<h3>{channel.channelTitle}</h3>
					          	</Link>
					        </div>
						)
					})}
				</div>
			</div>
		);
	}
}
