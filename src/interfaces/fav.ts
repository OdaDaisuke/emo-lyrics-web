import { Lyric } from './lyric'

export interface Fav {
    ID: string
    LyricID: number
    lyric: Lyric | null
}