import { SOUNDCLOUD_ID } from 'Constants/config'

export function track ({query, limit}) {
  return `https://api.soundcloud.com/tracks?q=${query}&limit=${limit}&client_id=${SOUNDCLOUD_ID}`
}
