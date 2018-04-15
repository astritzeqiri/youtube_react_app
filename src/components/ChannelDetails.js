import React, { Component } from 'react';

import Firebase from '../services/Firebase'
import YouTubeApi from '../services/YouTubeApi'
import RealtimeChannelData from './RealtimeChannelData'

import Header from '../parts/Header'
import Footer from '../parts/Footer'
import ChannelVideos from './ChannelVideos'

export default class ChannelDetails extends Component {
    constructor (props) {
        super(props);

        this.state = {
        	channel: null,
        	loading: false
        }
    }

    componentDidMount() {
        this.fetchChannelData()
    }

    fetchChannelData () {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true
		})

	    let app = Firebase.database().ref('youtubeChannels');
	    app
	    .orderByChild("channelId")
	    .equalTo(this.props.match.params.id)
	    .on('value', snapshot => {
	    	var values = snapshot.val();

	      	values = values ? Object.values(values) : [];

	      	if (values.length > 0) {
	      		this.setState({
	      			channel: values[0]
	      		})
	      	}

			this.setState({
				loading: false
			})
	    });
    }

    render() {
    	if (this.state.loading) {
    		return <div>Loading channel data</div>
    	}

    	if (! this.state.channel) {
    		return <div>Channel data not found</div>
    	}

        return (
        	<div>
				<h1>{this.state.channel.channelTitle}</h1>
	    		<div className="row text-center">
		    		<span className="profile-image-holder col-md-6">
		    			<img className="center" src={this.state.channel.thumbnail} /> <br />
		    		</span>
			        <div className="live-channel-data col-md-6">
		    			<h1>Live channel data</h1>
		        		<RealtimeChannelData channelId={this.state.channel.channelId} />
			        </div>
		        </div>
	        	<h3>Channel Videos</h3>
	        	<ChannelVideos channelId={this.state.channel.channelId} />
	        </div>
        );
    }
}
