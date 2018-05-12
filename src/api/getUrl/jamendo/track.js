import { JAMENDO_ID } from 'Constants/config'

export function track ({query, limit}) {
  return `https://api.jamendo.com/v3.0/tracks/?name=${query}&limit=${limit}&client_id=${JAMENDO_ID}`
}