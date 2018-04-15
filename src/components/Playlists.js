import React, { Component } from 'react';

import Firebase from '../services/Firebase'

import Header from '../parts/Header'
import Footer from '../parts/Footer'
import Playlist from './Playlist'
import { Link } from 'react-router-dom'

export default class Playlists extends Component {
    constructor (props) {
        super(props);

        this.state = {
        	playlists: [],
        	loading: false
        }
    }

    componentDidMount() {
        this.fetchPlaylists()
    }

    fetchPlaylists () {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true
		})

	    let app = Firebase.database().ref('playlists');
	    app
	    .on('value', snapshot => {
	    	var values = snapshot.val();

	      	values = values ? Object.values(values) : [];

	      	if (values.length > 0) {
	      		this.setState({
	      			playlists: values
	      		})
	      	}

			this.setState({
				loading: false
			})
	    });
    }

    render() {
    	if (this.state.loading) {
    		return <div>Loading playlists data</div>
    	}

    	if (this.state.playlists.length == 0) {
    		return <div>There are no playlists.</div>
    	}

        return (
        	<div>
        		<h3>Playlists</h3>
				<ul>
					{this.state.playlists.map(playlist => {
						return (
							<li>
								<Link to={'/playlists/' + playlist.name}>{playlist.name}</Link>
							</li>
						)
					})}
				</ul>	
			</div>	
        );
    }
}
