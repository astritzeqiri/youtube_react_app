import config from '../config/youtube_api'

import axios from 'axios';

export default {
	cachedIds: {},

	getChachedId (username) {
		if (this.cachedIds[username]) {
			return this.cachedIds[username];
		}
		
		return undefined;
	},

	hasChachedId (username) {
		return this.cachedIds[username] != undefined;
	},

	getIdFromUsername (username) {
        return new Promise((resolve, reject) => {
			if (this.hasChachedId(username)) {
				resolve(this.getChachedId(username));
			}

            axios.get(config.BASE_URL + "/channels", {
				params: {
					part: 'id',
					forUsername: username,
					key: config.API_KEY
				}
			})
            .then(response => {
                if (response.data.items[0]) {
	                this.cachedIds[username] = response.data.items[0].id;

	                resolve(response.data.items[0].id);
                } else {
                	reject({
                		msg: `Channel with username '${username}' not found`
                	});
                }
            })
            .catch(error => {
                reject(error.response);
            });
        });
	},

	getChannelStatistics (id) {
        return new Promise((resolve, reject) => {
            axios.get(config.BASE_URL + "/channels", {
				params: {
					id: id,
					part: 'statistics',
					key: config.API_KEY
				}
			})
            .then(response => {
                resolve(response.data.items[0].statistics);
            })
            .catch(error => {
                reject(error.response);
            });
        });
	},

	getChannelData (id) {
        return new Promise((resolve, reject) => {
            axios.get(config.BASE_URL + "/channels", {
				params: {
					id: id,
					part: 'snippet,contentDetails,statistics',
					key: config.API_KEY
				}
			})
            .then(response => {
                resolve(response.data.items[0]);
            })
            .catch(error => {
                reject(error.response);
            });
        });
	},

	getChannelVideos (channelId, maxResults = 8, pageToken) {
        return new Promise((resolve, reject) => {
            axios.get(config.BASE_URL + "/search", {
				params: {
					channelId,
					maxResults,
					pageToken,
					part: 'snippet,id',
					type: 'video',
					key: config.API_KEY
				}
			})
            .then(response => {
                resolve({
                	videos: response.data.items,
                	nextPageToken: response.data.nextPageToken
                });
            })
            .catch(error => {
                reject(error.response);
            });
        });
	},

	search (search) {
        return new Promise((resolve, reject) => {
            axios.get(config.BASE_URL + "/search", {
				params: {
					q: search,
					type: 'channel',
					part: 'snippet',
					key: config.API_KEY
				}
			})
            .then(response => {
                resolve(response.data.items);
            })
            .catch(error => {
                reject(error.response);
            });
        });
	}
}
