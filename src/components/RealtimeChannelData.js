import React, { Component } from 'react';

import YouTubeApi from '../services/YouTubeApi';

export default class RealtimeChannelData extends Component {
  
	constructor (props) {
		super(props);

		this.state = {
			interval: undefined,
			intervalTime: 2000,

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
 
 	componentWillUnmount () {
 		this.stopFetchingInterval()
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
					<div className="subscriber-count">
						<span>Subscribers: </span>
						
						<div className="subscriber-count-numbers">
							{this.state.statistics.subscriberCount.split(/(?!$)/).map(nr => {
								return <span>{nr}</span>
							})}
						</div>
					</div>
				}
				{
					this.state.statistics.videoCount && 
					this.state.statistics.viewCount && 
					this.state.statistics.commentCount &&
					
					<ul className="list-group">
						<li className="list-group">Videos: {this.state.statistics.videoCount}</li>
						<li className="list-group">Video views: {this.state.statistics.viewCount}</li>
						<li className="list-group">Video comments: {this.state.statistics.commentCount}</li>
					</ul> 
				}
			</div>
		);
	}
}
