import * as React from 'react'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { LyricCard } from '../molecules'
import { Lyric } from '../../interfaces'
import { Button } from '../atoms'
import { MediaBreakPointUp } from '../styles'

export interface ILyricCardList {
  onLast: any
  lyrics: Lyric[] | null
  lyricIdx: number
  isAtFirst: boolean
  isAtLast: boolean
  onClickNext: () => void
  onClickPrev: () => void
}

@observer
export class LyricCardList extends React.Component<ILyricCardList, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.style.container)}>
        {this.innerContainer}
        <div className={css(this.style.operation)}>
          {this.prevButton}
          {this.nextButton}
        </div>
      </div>
    )
  }

  @bind
  handleNext() {
    this.props.onClickNext()
    if(this.props.isAtLast) {
       this.props.onLast()
    }
  }

  @bind
  handlePrev() {
    this.props.onClickPrev()
  }

  get innerContainer() {
    if(!this.props.lyrics) {
      return null
    }
    const curLyric = this.props.lyrics[this.props.lyricIdx]
    return (
      <LyricCard
        title={curLyric.Title}
        lyric={curLyric.Lyric}
        singer={curLyric.Singer}
        url={curLyric.Url}
        key={curLyric.Lyric}
      />
    )
  }

  get prevButton() {
    if(!this.props.isAtFirst) {
      return (
      	<Button onClick={this.handlePrev}>{"<"}</Button>
      )
    }
  }

  get nextButton() {
    if(!this.props.isAtLast) {
      return (
      	<Button onClick={this.handleNext}>次の歌詞へ</Button>
      )
    }
  }

  get style() {
    return StyleSheet.create({
      container: {
        height: '75vh',
        paddingTop: '20px',
        position: 'relative',
        width: '100vw',
      },
      operation: {
        display: 'flex',
        justifyContent: 'center',
        [MediaBreakPointUp.SM]: {
        },
      },
    })
  }

}