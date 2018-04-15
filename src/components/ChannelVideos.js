import React, { Component } from 'react';

import Firebase from '../services/Firebase'
import YouTubeApi from '../services/YouTubeApi'
import RealtimeChannelData from './RealtimeChannelData'
import VideoList from './VideoList'

export default class ChannelVideos extends Component {
    constructor (props) {
        super(props);

        this.state = {
        	videos: [],
        	perPage: 8,
        	loading: false,
        	allLoaded: false,
        	nextPageToken: null,
        }
    }

    componentDidMount() {
        this.fetchVideos()
    }

    fetchVideos () {
		if (this.state.loading || this.state.allLoaded) {
			return;
		}

		this.setState({
			loading: true
		})

		YouTubeApi
		.getChannelVideos(this.props.channelId, this.state.perPage, this.state.nextPageToken)
		.then(({ videos, nextPageToken }) => {
			this.setState({
				videos: this.state.videos.concat(Object.values(videos)),
				nextPageToken,
				allLoaded: ! nextPageToken,
				loading: false
			})
		})
    }

    loadMore () {
    	this.fetchVideos();
    }

    getLink (video) {
    	if (! video) {
    		return
    	} 
    	return `https://www.youtube.com/watch?v=${video.id.videoId}`
    }

    render() {
    	var loadMoreBtnText = 'Load more';

    	if (this.state.allLoaded) {
    		loadMoreBtnText = 'All loaded'
    	} else if (this.state.loading) {
    		loadMoreBtnText = 'Loading...'
    	}

        return (
	      	<div class="row">
	      		<VideoList videos={this.state.videos} />
				<div className="text-center col-md-12">
					<a className="btn btn-primary text-white" disabled={this.state.loading || this.state.allLoaded} onClick={this.loadMore.bind(this)}>{loadMoreBtnText}</a>
			    </div>
		    </div>
        );
    }
}
