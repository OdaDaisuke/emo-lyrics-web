import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain/lyric'
import { LyricCard } from '../molecules'
import { Lyric } from '../../interfaces'
import { Button } from '../atoms'

export interface ILyricCardList {
  onLast: any
  lyrics: Lyric[] | null
  lyricIdx: number
  isAtFirst: boolean
  isAtLast: boolean
  incrementIdx: () => void
  decrementIdx: () => void
}

@observer
export class LyricCardList extends React.Component<ILyricCardList, any> {
  constructor(props: ILyricCardList) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
        {this.innerContainer}
        <div className={css(this.style.operation)}>
          {this.prevButton}
          {this.nextButton}
        </div>
      </div>
    )
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
        height: '75vh',
        position: 'relative',
        width: '100vw',
      },
      operation: {
        display: 'flex',
        justifyContent: 'center',
      },
    })
  }

  @bind
  handleNext() {
    this.props.incrementIdx()
    if(this.props.isAtLast) {
       this.props.onLast()
    }
  }

  @bind
  handlePrev() {
    this.props.decrementIdx()
  }

  get innerContainer() {
    if(!this.props.lyrics) {
      return null
    }
    const curLyric = this.props.lyrics[this.props.lyricIdx]
    return (
      <LyricCard
        title={curLyric.Title}
        content={curLyric.Content}
        singer={curLyric.Singer}
        url={curLyric.Url}
        key={curLyric.Content}
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

}