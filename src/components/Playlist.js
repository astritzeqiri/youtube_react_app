import React, { Component } from 'react';

import VideoList from './VideoList'

import  Firebase from '../services/Firebase'

export default class Playlist extends Component {

	constructor (props) {
		super(props);

		this.state = {
			playlist: undefined,
			loading: false
		}
	}

	componentDidMount() {
		this.fetchPlaylistData()
	}

    fetchPlaylistData () {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true
		})

	    let app = Firebase.database().ref('playlists');
	    app
	    .orderByChild("name")
	    .equalTo(this.props.match.params.id)
	    .on('value', snapshot => {
	    	var values = snapshot.val();
	      	values = values ? Object.values(values) : [];

	      	if (values.length > 0) {
	      		this.setState({
	      			playlist: values[0]
	      		})
	      	}

			this.setState({
				loading: false
			})
	    });
    }


    render() {
    	if (this.state.loading) {
    		return "Loading playlist.";
    	}

    	if (! this.state.playlist) {
    		return "Playlist not found.";
    	}

        return (
			<div class="col-md-12 portfolio-item">
				<span>Playlist: {this.state.playlist.name}</span>
				
				<h4>Videos</h4>
				<VideoList addToPlaylistBtn={false} videos={Object.values(this.state.playlist.videos)} />
			</div>
        );
    }
}
