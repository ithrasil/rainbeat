import { PATTERN } from 'Api/patterns.js';
import { PLACEHOLDER, SMALL_PLACEHOLDER } from 'Constants/config.js';

export function normalizeTracks(tracks, pattern) {
	
	const {artwork_url_P, big_artwork_url_P, artist_P, source_P, stream_P, title_P} = PATTERN[pattern].trackPattern;
	
	let normalizedTracks = [];
	
	for(const track of tracks) {
		
		let artwork_url = track[artwork_url_P];
		
		let big_artwork_url;

		if(artwork_url == undefined) {
			artwork_url = SMALL_PLACEHOLDER;
			big_artwork_url = PLACEHOLDER;
		}
		else {
			big_artwork_url = big_artwork_url_P(artwork_url);
		}
		normalizedTracks.push(
			{
				artwork_url: artwork_url,
				big_artwork_url: big_artwork_url,
				artist: artist_P(track),
				source: pattern.toLowerCase(),
				stream_url: track[stream_P],
				name: track[title_P]
			}
		)
	}
	
	return normalizedTracks;
}

export function normalizeArtists(artists, pattern) {
	
	if(pattern == "SOUNDCLOUD") {
		artists = artists.data;
	}
	else {
		artists = artists.data.results;
	}
	
	const {name_P} = PATTERN[pattern].artistPattern;
	
	let normalizedArtists = [];
	
	for(const artist of artists) {

		normalizedArtists.push(
			{
				name: artist[name_P],
				source: pattern.toLowerCase(),
				id: artist.id
			}
		)
	}
	
	return normalizedArtists;
}

export function normalizePlaylists(playlists, pattern) {
	if(pattern == "SOUNDCLOUD") {
		playlists = playlists.data;
	}
	else {
		playlists = playlists.data.results;
	}
	
	const {title_P} = PATTERN[pattern].playlistPattern;
	
	let normalizedPlaylists = [];
	for(const playlist of playlists) {

		normalizedPlaylists.push(
			{
				name: playlist[title_P],
				source: pattern.toLowerCase(),
				id: playlist.id
			}
		)
	}
	
	return normalizedPlaylists;
}