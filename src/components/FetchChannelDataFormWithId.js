import React, { Component } from 'react';

import YouTubeApi from '../services/YouTubeApi';
import { saveChannelData } from '../services/Database'

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

        if (this.state.searching) {
        	return;
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
			thumbnail: snippet.thumbnails.default.url
		})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.search.bind(this)}>
                    {this.state.error}
                    <div className="form-group">
                        <input type="text" 
                        	value={this.state.username} 
                        	onChange={this.usernameChange.bind(this)} 
                        	className="form-control" 
                        	placeholder="Youtube username" 
                        	aria-describedby="basic-addon1"
                        	disabled={this.state.searching}
                    	/>
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn btn-default mt" disabled={this.state.searching}>Search</button>
                    </div>
                </form>
            	{this.state.searching ? "Searching..." : ""}
	
				{this.state.searchResults.length > 0 && 
					<div>
						<h3>Search Results</h3>
		            	<ul>
				            {this.state.searchResults.map(channel => {
				            	return (
				            		<li>
				            			Id: {channel.snippet.channelId} <br />
				            			Title: {channel.snippet.channelTitle}<br />
				            			<img src={channel.snippet.thumbnails.default.url} />
				            			<a href="javscript:void(0);" onClick={this.saveToDb.bind(this, channel)}>Save</a>
				            		</li>
			            		)
				            })}
		            	</ul>
	            	</div>
				}
            </div>
        );
    }
}
