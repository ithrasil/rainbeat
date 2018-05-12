import { soundcloud } from 'Api/getUrl/soundcloud'
import { jamendo } from 'Api/getUrl/jamendo'

export function getUrl (type, api, parameters) {
  const apis = {
    'jamendo': jamendo,
    'soundcloud': soundcloud
  }

  return apis[api](type, parameters)
}