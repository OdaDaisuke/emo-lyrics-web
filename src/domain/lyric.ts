import { APIClient } from '../infra'
import { Lyric } from '../interfaces'
import * as configs from '../configs'

export class LyricService {
  private apiClient: APIClient

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient
  }

  fetchLyric() {
    return this.apiClient.fetchLyric()
  }

  fetchNotFoundLyric() {
    return this.apiClient.fetchNotFoundLyric()
  }

  shuffle(lyrics: Lyric[]) {
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

// repoとentityは省略
