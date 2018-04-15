import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
		    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
					<a className="navbar-brand" href="/">Youtube channel data</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<a className="nav-link" href="/">Home</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/playlists">Playlists</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}
