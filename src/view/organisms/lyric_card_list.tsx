import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain/lyric'
import { LyricCard } from '../molecules'
import { LyricProps } from '../../data'
import { Button } from '../atoms'

export interface ILyricCardList {
  vm: LyricCardListVM
  onLast: any
  lyricService: LyricService
}

@observer
export class LyricCardList extends React.Component<ILyricCardList, any> {
  constructor(props: ILyricCardList) {
    super(props)
    this.props.vm.initialize(props.lyricService)
    this.props.vm.getLyrics()
  }

  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
	{this.mainDom}
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
    this.props.vm.incrementIdx()
    if(this.props.vm.isAtLast) {
       this.props.onLast()
    }
  }

  @bind
  handlePrev() {
    this.props.vm.decrementIdx()
  }

  /*------ dom ------*/
  get mainDom() {
    if(!this.props.vm.lyrics) {
      return null
    }
    const curLyric = this.props.vm.lyrics.$mobx.values[this.props.vm.lyricIdx]
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
    if(!this.props.vm.isAtFirst) {
      return (
	<Button onClick={this.handlePrev} label="<" />
      )
    }
  }

  get nextButton() {
    if(!this.props.vm.isAtLast) {
      return (
	<Button onClick={this.handleNext} label="次の歌詞へ" />
      )
    }
  }

}

export class LyricCardListVM {
  private lyricService: LyricService | null = null

  @observable
  lyricIdx: number = 0

  @observable
  lyrics: any = null

  @observable
  isAtLast: boolean = false

  @observable
  isAtFirst: boolean = true

  initialize(lyricService: LyricService) {
    this.lyricService = lyricService
  }

  getLyrics() {
    if(!this.lyricService) {
      return null
    }
    this.lyricService.get(this.getLyricsCallback)
  }

  @bind
  getLyricsCallback(lyrics: LyricProps[]) {
    if(!this.lyricService) {
      return null
    }
    this.lyrics = this.lyricService.shuffle(lyrics)
  }

  incrementIdx() {
    if(!this.lyrics) {
      return
    }
    const nextIdx = this.lyricIdx + 1
    if(nextIdx < this.lyrics.length) {
      this.lyricIdx = nextIdx
    }
    if(nextIdx + 1 == this.lyrics.length) {
      this.isAtLast = true
    } else {
      this.isAtLast = false
    }
    this.judgePosition()
  }

  decrementIdx() {
    const prevIdx = this.lyricIdx - 1
    if(prevIdx >= 0) {
      this.lyricIdx = prevIdx
    }
    this.judgePosition()
  }

  private judgePosition() {
    // At last?
    if(this.lyricIdx + 1 == this.lyrics.length || this.lyrics.length == 1) {
      this.isAtLast = true
    } else {
      this.isAtLast = false
    }

    // At first?
    if(this.lyricIdx == 0) {
      this.isAtFirst = true
    } else {
      this.isAtFirst = false
    }

  }


}
