export let PATTERN =  {
	JAMENDO: {
		trackPattern: {
			artwork_url_P: "album_image",
			big_artwork_url_P: function(image) {
				return image.replace("1.200", "1.500")
			},
			artist_P: function(artist) {
				return artist.artist_name
			},
			source_P: "jamendo",
			stream_P: "audio",
			title_P: "name"
		}
	},

	SOUNDCLOUD: {
		trackPattern: {
			artwork_url_P: "artwork_url",
			big_artwork_url_P: function(image) {
				return image.replace("large", "t500x500")
			},
			artist_P: function(track) {
				return track.user.username
			},
			source_P: "soundcloud",
			stream_P: "stream_url",
			title_P: "title"
		},
		artistPattern: {
			name: "username",
			id: "id"
		}
	}
}

