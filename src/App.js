import React, { Component } from 'react';
import './App.css';

import Header from './parts/Header'
import Footer from './parts/Footer'
import Home from './components/Home'
import Playlist from './components/Playlist'
import Playlists from './components/Playlists'
import ChannelDetails from './components/ChannelDetails'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
    constructor () {
        super();
    }

    render() {
        return (
			<div>
			    <Header />
		    		<div className="container">
					    <BrowserRouter>
					    	<Switch>
					    		<Route exact path="/" component={Home} />
					    		<Route exact path="/channels/:id" component={ChannelDetails} />
					    		<Route exact path="/playlists" component={Playlists} />
					    		<Route exact path="/playlists/:id" component={Playlist} />
					    	</Switch>
					    </BrowserRouter>
					</div>
				<Footer />
			</div>
        );
    }
}

export default App;
