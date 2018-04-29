import {PLACEHOLDER, SMALL_PLACEHOLDER} from "Constants/config";

export const soundcloud_pattern = {
    artwork_url: function(track) {
        let artwork_url = track["artwork_url"];
        if (artwork_url === undefined || artwork_url == null) {
            return SMALL_PLACEHOLDER;
        }
        return artwork_url;
    },
    big_artwork_url : function(track) {
        let artwork_url = track["artwork_url"];
        if (artwork_url === undefined || artwork_url == null) {
            return PLACEHOLDER;
        }
        return artwork_url.replace("large", "t500x500");
    },
    artist: function(track) {
        return track.user.username;
    },
    stream: function(track) {
        return track.uri + "/stream";
    },
    title: "title"
};