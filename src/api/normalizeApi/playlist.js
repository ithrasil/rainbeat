import { jamendo_pattern } from 'Api/normalizeApi/playlist/jamendo'
import { soundcloud_pattern } from 'Api/normalizeApi/playlist/soundcloud'

export function playlist (api, playlists) {
  const patterns = {
    'soundcloud': soundcloud_pattern,
    'jamendo': jamendo_pattern
  }
  let pattern = patterns[api]

  let normalized = []

  for (const playlist of playlists) {
    normalized.push({
      name: playlist[pattern.name],
      source: api,
      id: playlist.id
    })
  }

  return normalized
}