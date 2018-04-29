import {PLACEHOLDER, SMALL_PLACEHOLDER} from "Constants/config";

export const jamendo_pattern = {
    artwork_url: function(track) {//
        let album_image = track["album_image"];
        if (album_image === undefined || album_image == null) {
            return SMALL_PLACEHOLDER;
        }
        return album_image;
    },
    big_artwork_url : function(track) {
        let album_image = track["album_image"];
        if (album_image === undefined || album_image == null) {
            return PLACEHOLDER;
        }
        return album_image.replace("1.200", "1.500");
    },
    artist: function(artist) {
        return artist.artist_name
    },
    stream: function(track) {
        return track.audio;
    },
    title: "name"
};