import { JAMENDO_ID } from 'Constants/config'

export function playlistTracks ({name, limit}) {
  return `https://api.jamendo.com/v3.0/playlists/tracks?&name=${name}&limit=${limit}&client_id=${JAMENDO_ID}`
}