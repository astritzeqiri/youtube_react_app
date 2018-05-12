import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Firebase from '../services/Firebase'

export default class ChannelList extends Component {
  
	constructor (props) {
		super(props);

		this.state = {
			channels: [],
			loading: true,

			currentChannels: [],
			currentPage: 1,
			totalPages: 1,
			perPage: 9	
		}

	}

	componentDidMount () {
	    let app = Firebase.database().ref('youtubeChannels');
	    app.on('value', snapshot => {
	      	if (snapshot.val()) {
				var channels = Object.values(snapshot.val());

				var totalPages = Math.ceil(channels.length / this.state.perPage);
		      	this.setState({
		      		channels,
		      		totalPages,
		      		loading: false
		      	})
		      	return;
	      	}

	      	this.setState({
	      		loading: false
	      	})
	    });		
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.channels != this.state.channels) {
			this.setState({
				currentPage: 1
			})

			this.setCurrentPageChannels()
		}
	}

	setCurrentPageChannels () {
		this.setState((state) => {
			var perPage = state.perPage;
			var currentPage = state.currentPage - 1;

		  	var currentChannels = state.channels.slice(currentPage * perPage, (currentPage + 1) * perPage);

			return {
				currentChannels
			}
		})
	}


	viewChannel (channel) {
		if (typeof this.props.onChannelSelected == 'function') {
			this.props.onChannelSelected(channel)
		}
	}

	goToPage (page) {
		if (this.state.currentPage == page || this.state.totalPages < page) {
			return;
		}

		this.setState({
			currentPage: page
		})

		this.setCurrentPageChannels()
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
			      	<h1 className="my-4">Channels</h1>
					<span>Loading...</span>
			    </div>
			)
		}

		return (
			<div>
		      	<h1 className="my-4">Channels</h1>
				<div className="row">
					{this.state.currentChannels.map(channel => {
						return (
							<div className="col-lg-4 col-sm-6 text-center mb-4">
					          	<Link to={'/channels/' + channel.channelId}>
					          		<img className="rounded-circle channel-image img-fluid d-block mx-auto" src={channel.thumbnail} />
					          		<h3>{channel.channelTitle}</h3>
					          	</Link>
					        </div>
						)
					})}
					{Array.apply(null, {length: this.state.totalPages}).map((_, nr) => {
						var page = nr + 1;
						return <a className={this.state.currentPage == page ? 'current-page' : ''} href="javascript:void();" onClick={this.goToPage.bind(this, page)}>{page}</a>
					})}
				</div>
			</div>
		);
	}
}
