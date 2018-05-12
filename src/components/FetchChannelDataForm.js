import React, { Component } from 'react';

import YouTubeApi from '../services/YouTubeApi';
import { saveChannelData } from '../services/Database'
import { Redirect } from 'react-router-dom'

export default class FetchChannelDataForm extends Component {
  
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            error: '',
            searching: false,
            searchResults: []
        }
    }

    search (event) {
        event.preventDefault();
        this.setError("")

        if (this.state.searching) {
        	return
        }

        if (! this.state.username) {
            this.setError("Please write a channel name to search for")
            return
        }

        this.setState({ searching : true })

        YouTubeApi.search(this.state.username)
        .then(data => {
        	this.setState({
        		searching: false,
        		searchResults: data
        	})
        })
        .catch(err => this.setState({ searching: false }))
    }

    usernameChange (event) {
        this.setState({
            username: event.target.value
        })
    }

    setError (error) {
    	this.setState({
    		error: error
    	})
    }

    saveToDb (channel) {
    	var snippet = channel.snippet;

        saveChannelData(snippet.channelId, {
			channelId: snippet.channelId,
			channelName: snippet.channelId,
			channelTitle: snippet.channelTitle,
			thumbnail: snippet.thumbnails.medium.url
		})

		this.setState({
			gotochannel: {
				channelId: snippet.channelId
			}
		})
    }

    render() {
    	if (this.state.gotochannel) {
      		return <Redirect to={'/channels/' + this.state.gotochannel.channelId} />
    	}

        return (
            <div className="fetch-channels-holder">
                <form onSubmit={this.search.bind(this)} className="fetch-channels-fornm">
                    {this.state.error}
                    <div className="form-group">
                        <input 
                        	type="text" 
                        	className="form-control" 
                        	value={this.state.username} 
                        	onChange={this.usernameChange.bind(this)} 
                        	placeholder="Search for channel..." s
                        	disabled={this.state.searching}
                    	/>
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn btn-default mt" disabled={this.state.searching}>Search</button>
                    </div>
                </form>

            	{this.state.searching ? "Searching..." : ""}
				{this.state.searchResults.length > 0 && 
					<div className="fetch-channels-results">
						<h3>Search Results</h3>
		            	<div className="row">
				            {this.state.searchResults.map(channel => {
				            	return (
							        <div className="col-md-12 channel-result">
							            <div className="media">
							              <div className="media-left">
							                <a onClick={this.saveToDb.bind(this, channel)} href="javascript:void(0);">
							                  	<img width="50" height="50" className="media-object" src={channel.snippet.thumbnails.default.url} />
							                </a>
							              </div>
							              <div className="media-body">
							                <a onClick={this.saveToDb.bind(this, channel)} href="javascript:void(0);">
							                	<h4 className="media-heading">{channel.snippet.channelTitle}</h4>
							                </a>
							              </div>
							            </div>
							        </div>
			            		)
				            })}
		            	</div>
	            	</div>
				}
            </div>
        );
    }
}
