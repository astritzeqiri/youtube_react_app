import Firebase from './Firebase'

let db = Firebase.database();

export function deleteChannelData(channelName, callback) {
	return db.ref('youtubeChannels').child(channelName).remove(callback);
}

export function saveChannelData(channelName, data) {
	return db.ref('youtubeChannels').child(channelName).set(data);
}

export function saveVideoToPlaylist(playlistId, video) {
	const videoRefChild = db.ref('playlists').child(playlistId).child('videos').child(video.id.videoId);

	return videoRefChild.once('value', snapshot => {
		if (! snapshot.exists()) {
			videoRefChild.set(video)
		}
	})
}
