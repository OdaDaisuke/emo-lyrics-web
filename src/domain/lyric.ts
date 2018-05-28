import { APIClient } from '../infra'
import { LyricProps } from '../data'
import * as configs from '../configs'

export class LyricService {

  getSome(callback: any) {
    APIClient.getLyrics(callback)
  }

  get(callback: any) {
    APIClient.getLyric(callback)
  }

  getNotFoundLyric(callback: any) {
    APIClient.getNotFoundLyric(callback)
  }

  create(options: any, callback: any) {
    APIClient.create(options, callback)
  }

  shuffle(lyrics: LyricProps[]) {
    const len = lyrics.length
    for(let i = 0; i < parseInt(configs.env.lyricShuffleRound); ++i) {
      const r1 = parseInt(String(Math.random() * len))
      const r2 = parseInt(String(Math.random() * len))
      const tmp = lyrics[r1]
      lyrics[r1] = lyrics[r2]
      lyrics[r2] = tmp
    }
    return lyrics
  }

}
