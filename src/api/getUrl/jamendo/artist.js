import { JAMENDO_ID } from 'Constants/config'

export function artist ({query, limit}) {
  return `https://api.jamendo.com/v3.0/artists/?name=${query}&limit=${limit}&client_id=${JAMENDO_ID}`
}