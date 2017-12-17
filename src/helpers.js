// Constants
import { CLIENT_ID } from 'Constants/config.js';

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

export function resizeArtwork(url, size) {
   if(url == null) return "http://via.placeholder.com/500x500";

	const beginning = url.lastIndexOf('-');
	const end = url.lastIndexOf('.');

	const newUrl = url.substr(0, beginning + 1) + "t" + size + "x" + size + url.substr(end, url.length);

	return newUrl;
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

export function getSoundCloudUrl(type, query) {
	return `https://api.soundcloud.com/${ type }?client_id=${ CLIENT_ID }&q=${query}`;
}
