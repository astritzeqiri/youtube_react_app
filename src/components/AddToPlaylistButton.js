import React, { Component } from 'react';

import { saveVideoToPlaylist } from '../services/Database'

export default class AddToPlaylistButton extends Component {
    constructor (props) {
        super(props);
    }

    addToPlaylist (playlistId) {
    	saveVideoToPlaylist(playlistId, this.props.video);
    }

    render() {
        return (
        	<a href="javascript:void(0);" onClick={this.addToPlaylist.bind(this, 1)}>Save to playlist</a>
        );
    }
}
