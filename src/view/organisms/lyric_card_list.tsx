import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { LyricCard } from '../molecules'
import { Lyric, Fav } from '../../interfaces'

export interface ILyricCardList {
  lyrics: Lyric[] | null
  lyricIdx: number
  isAtFirst: boolean
  isAtLast: boolean
  favs: Fav[] | null
  onClickLyric: () => void
  onClickFav: () => void
  onClickUnfav: () => void
}

@observer
export class LyricCardList extends React.Component<ILyricCardList, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.styles.container)}>
        {this.innerContainer}
      </div>
    )
  }

  get innerContainer() {
    if(!this.props.lyrics) {
      return null
    }
    const curLyric = this.props.lyrics[this.props.lyricIdx]
    return (
      <div className={css(this.styles.innerContainer)}>
        <LyricCard
          onClickLyric={this.props.onClickLyric}
          onClickFav={this.props.onClickFav}
          onClickUnfav={this.props.onClickUnfav}
          favs={this.props.favs}
          lyricObj={curLyric}
          title={curLyric.Title}
          lyric={curLyric.Lyric}
          singer={curLyric.Singer}
          url={curLyric.Url}
          key={curLyric.Lyric}
        />
      </div>
    )
  }

  get styles() {
    return StyleSheet.create({
      container: {
        boxSizing: 'border-box',
        padding: '10vh 0 20px',
        position: 'relative',
        width: '100vw',
      },
      innerContainer: {
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
      },
    })
  }

}