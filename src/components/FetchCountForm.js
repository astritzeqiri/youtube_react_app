import React, { Component } from 'react';

import Firebase from '../services/Firebase'
import YouTubeApi from '../services/YouTubeApi';

export default class FetchCountForm extends Component {
  
    constructor () {
        super();

        this.state = {
            username: 'asdasd',
            error: ''
        }

        this.usernameChange = this.usernameChange.bind(this);
        this.fetchCount = this.fetchCount.bind(this);
    }

    fetchCount (event) {
        event.preventDefault();

        if (! this.state.username) {
            this.setState({
                error : {
                    msg: 'Please write a username to search for'
                }
            })
            // eventBus.$emit('fetch-count', undefined);
            return;
        }

        this.props.onFetchCount(this.state.username)

        YouTubeApi.getIdFromUsername(this.state.username)
        .then(id => {
            // eventBus.$emit('fetch-count', id);
            
            this.clearError();
        })
        .catch(error => {
            // eventBus.$emit('fetch-count', undefined);
            
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
                <form onSubmit={this.fetchCount}>
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
