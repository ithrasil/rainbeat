import { JAMENDO_ID } from 'Constants/config'

export function artistTracks ({name, limit}) {
  return `https://api.jamendo.com/v3.0/artists/tracks?&name=${name}&limit=${limit}&client_id=${JAMENDO_ID}`
}