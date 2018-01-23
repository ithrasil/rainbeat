// Constants
import { CLIENT_ID, PLACEHOLDER } from 'Constants/config.js';

export function normalizeTracks(tracks, pattern) {
	
	const {artwork_url_P, big_artwork_url_P, artist_P, source_P, stream_P, title_P} = pattern.tracksPattern
	
	let normalizedTracks = [];
	
	for(const track of tracks) {
		
		let artwork_url = track[artwork_url_P];
		let big_artwork_url;
		
		if(track.artwork_url == undefined) {
			artwork_url = PLACEHOLDER;
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
				source: source_P,
				stream_url: track[stream_P],
				title: track[title_P]
			}
		)
	}
	
	return normalizedTracks;
}


export function normalizeTitle(title) {
	const index = title.indexOf('-') + 1;
	let extra = 0;
	
	if(index != undefined) {
		if(title[index] == " ") {
			extra = 1
		}
		return title.slice(index+extra, title.length+1)
	}
	else {
		return title
	}
}

export function assignCardId(direction, tracks, cardId) {

	const length = tracks.length-1;

	if(direction == "next"){
		if(cardId == length){
			cardId = 0;
		}
		else {
			cardId++;
		}
	}
	else if(direction == "prev"){
		if(cardId == 0){
			cardId = length;
		}
		else {
			cardId--;
		}
	}

	return cardId;

}

export function convertSecondsToMs(d) {
	let m = Math.floor(d / 60);
	let s = Math.floor(d % 60);
	return ((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

export function prepareStorage() {
	if(localStorage.getItem('muted') == null) {
		localStorage.setItem('muted', false);
	}
	if(localStorage.getItem('volume') == null) {
		localStorage.setItem('volume', "0.5");
	}
}

export function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

export function getSCUrl(type, query) {
	return `https://api.soundcloud.com/${ type }?client_id=${ CLIENT_ID }&q=${query}`;
}
