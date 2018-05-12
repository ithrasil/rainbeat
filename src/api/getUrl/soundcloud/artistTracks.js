import { SOUNDCLOUD_ID } from 'Constants/config'

export function artistTracks ({id, limit}) {
  return `https://api.soundcloud.com/users/${id}/tracks?limit=${limit}&client_id=${SOUNDCLOUD_ID}`
}