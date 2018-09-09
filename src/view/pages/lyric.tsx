import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { bind } from 'bind-decorator'
import * as configs from '../../configs'
import { Button, Sentence } from '../atoms'
import { LyricService } from '../../domain'
import { LyricProps } from '../../interfaces'
import { ThanksAlert } from '../molecules'
import { LyricCardList } from '../organisms'

export interface ILyricProps {
  history: any
  vm: LyricPageVM
}

export class Lyric extends React.Component<ILyricProps, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
        {this.mainContent}
      </div>
    )
  }

  get mainContent() {
    if(!this.props.vm.lyrics) {
      return (
        <div>
          <p>歌詞がありません。</p>
        </div>
      )
    }
    return (
      <LyricCardList
        onLast={this.onLast}
        lyrics={this.props.vm.lyrics}
        lyricIdx={this.props.vm.lyricIdx}
        isAtLast={this.props.vm.isAtLast}
        isAtFirst={this.props.vm.isAtFirst}
        incrementIdx={this.props.vm.incrementIdx}
        decrementIdx={this.props.vm.decrementIdx}
      />
    )
  }

  @bind
  onLast() {
    this.props.history.push('/thanks')
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
      	position: 'relative',
      },
    })
  }

}

export class LyricPageVM {
  private lyricService: LyricService | null = null

  @observable
  lyricIdx: number = 0

  @observable.ref
  lyrics: LyricProps[] | null = null

  @observable
  isAtLast: boolean = false

  @observable
  isAtFirst: boolean = true

  constructor(lyricService: LyricService) {
    this.lyricService = lyricService
    this.fetchLyrics()
  }

  fetchLyrics() {
    if(!this.lyricService) {
      return null
    }
    this.lyricService.get(this.fetchLyricsCallback)
  }

  @bind
  fetchLyricsCallback(lyrics: LyricProps[]) {
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
    if(!this.lyrics) {
      return
    }
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