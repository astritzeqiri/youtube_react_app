import React, { Component } from 'react';

import YouTubeApi from '../services/YouTubeApi';
import { setChannelData } from '../services/Database'

export default class FetchChannelDataForm extends Component {
  
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            error: ''
        }

        this.usernameChange = this.usernameChange.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    fetch (event) {
        event.preventDefault();

        if (! this.state.username) {
            this.setState({
                error : {
                    msg: 'Please write a username to search for'
                }
            })
            return;
        }

        YouTubeApi.getIdFromUsername(this.state.username)
        .then(id => {
            this.props.onNewChannelId(id)

           	YouTubeApi.getChannelData(id).then(data => {
	            setChannelData(this.state.username, {
				  	channelId: data.id,
				  	channelName: this.state.username,
				  	channelTitle: data.snippet.title
				})
           	})
            
            this.clearError();
        })
        .catch(error => {
            this.setState({
                error
            })
        });
    }

    usernameChange (event) {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.fetch}>
                    {this.state.error && this.state.error.msg}
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">@</span>
                        <input type="text" value={this.state.username} onChange={this.usernameChange} className="form-control" placeholder="Youtube username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn btn-default mt">Show subscriber count</button>
                    </div>
                </form>
            </div>
        );
    }
}
