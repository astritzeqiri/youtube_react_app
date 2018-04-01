import React, { Component } from 'react';
import './App.css';

import FetchCountForm from './components/FetchCountForm'

class App extends Component {
    constructor () {
        super();

        this.fetchCount = this.fetchCount.bind(this)
    }

    render() {
        return (
            <div className="container">
                <FetchCountForm onFetchCount={this.fetchCount} />
            </div>
        );
    }
}

export default App;
