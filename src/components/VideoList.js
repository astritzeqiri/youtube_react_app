import React, { Component } from 'react';

import AddToPlaylistButton from './AddToPlaylistButton'

export default class VideoList extends Component {
    constructor (props) {
        super(props);
    }

    getLink (video) {
    	if (! video) {
    		return
    	} 
    	return `https://www.youtube.com/watch?v=${video.id.videoId}`
    }

    render() {
        return (
	      	<div className="row">
				{this.props.videos.map(video => {
					var url = this.getLink(video);
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
							<div className="card h-100">
								<a target="blank" href={url}><img className="card-img-top" src={video.snippet.thumbnails.medium.url} /></a>
								<div className="card-body">
									<h4 className="card-title">
										<a target="blank" href={url}>{video.snippet.title}</a>
									</h4>
									{this.props.addToPlaylistBtn !== false && <AddToPlaylistButton video={video}></AddToPlaylistButton>}
								</div>
							</div>
						</div>
					)
				})}
		    </div>
        );
    }
}
