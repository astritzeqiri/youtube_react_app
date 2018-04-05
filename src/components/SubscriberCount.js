import React, { Component } from 'react';

import YouTubeApi from '../services/YouTubeApi';

export default class SubscriberCount extends Component {
  
	constructor (props) {
		super(props);

		this.state = {
			interval: undefined,
			intervalTime: 1000,

			statistics: {
				viewCount: 0,
				videoCount: 0,
				commentCount: 0,
				subscriberCount: 0,
			}
		}
	}

    onChannelIdChanged () {
        this.resetStatistics();

        this.startFetchingInterval();
    }

    componentDidUpdate(prevProps) {
    	if (this.props.channelId != prevProps.channelId) {
    		this.onChannelIdChanged()
    	}
    }
 
 	startFetchingInterval () {
        this.stopFetchingInterval();

        if (! this.props.channelId) {
        	return;
        }

        this.fetchCount();
        
        var interval = setInterval(() => {
            this.fetchCount();
        }, this.state.intervalTime);

        this.setState({
        	interval
        })
    }

	stopFetchingInterval () {
	    clearInterval(this.state.interval);
	}

    fetchCount () {
        YouTubeApi
        .getChannelStatistics(this.props.channelId)
        .then(statistics => this.setState({ statistics }))
        .catch(data => console.log('something went wrong'));
    }


    resetStatistics () {
    	this.setState({
    		statistics: {
				viewCount: 0,
				videoCount: 0,
				commentCount: 0,
				subscriberCount: 0
			}
    	})
    }

    componentDidMount() { 
		this.onChannelIdChanged();
	}

	render() {
		return (
			<div>
				{
					this.state.statistics.subscriberCount > 0 && 
						<div className="subscriberCount">
							<span className="subscriberCountNr">{this.state.statistics.subscriberCount}</span>
						</div>
				}
				{
					this.state.statistics.videoCount && 
					this.state.statistics.viewCount && 
					this.state.statistics.commentCount &&
					
					<ul>
						<li>
							Total videos: {this.state.statistics.videoCount}
							Total views: {this.state.statistics.viewCount}
							Total comments: {this.state.statistics.commentCount}
						</li>
					</ul> 
				}
			</div>
		);
	}
}
