import Firebase from './Firebase'

let db = Firebase.database();

export function deleteChannelData(channelName, callback) {
	return db.ref('youtubeChannels').child(channelName).remove(callback);
}

export function setChannelData(channelName, data) {
	return db.ref('youtubeChannels').child(channelName).set(data);
}
