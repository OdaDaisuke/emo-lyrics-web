import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService } from '../../domain'
import * as interfaces from '../../interfaces'
import { LyricCardList } from '../organisms'

export interface ILyricProps {
  history: any
  vm: LyricPageVM
}

@observer
export class Lyric extends React.Component<ILyricProps, any> {
  render(): JSX.Element {
    return (
      <div className={this.containerClass}>
        {this.mainContent}
      </div>
    )
  }

  get containerClass() {
    return [
      css(this.styles.container),
      !this.props.vm.lyrics && css(this.styles.emptyStatusContainer),
    ].join(' ')
  }

  get mainContent() {
    if(!this.props.vm.lyrics) {
      return (
        <div>
          <p className={css(this.styles.emptyStatusLabel)}>歌詞が取得できませんでした。</p>
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

  get styles() {
    return StyleSheet.create({
      container: {
      	position: 'relative',
      },
      emptyStatusContainer: {
        textAlign: 'center',
      },
      emptyStatusLabel: {
        color: '#5f5f5f',
        fontSize: '0.9em',
        letterSpacing: '1px',
        marginTop: '3em',
      },
    })
  }

}

export class LyricPageVM {
  private lyricService: LyricService | null = null

  @observable
  lyricIdx: number = 0

  @observable.ref
  lyrics: interfaces.Lyric[] | null = null

  @observable
  isAtLast: boolean = false

  @observable
  isAtFirst: boolean = true

  constructor(lyricService: LyricService) {
    this.lyricService = lyricService
    this.fetchLyrics()
  }

  async fetchLyrics() {
    if(!this.lyricService) {
      return null
    }
    const lyrics = await this.lyricService.fetchLyric()
    this.lyrics = this.lyricService.shuffle(lyrics)
  }

  @bind
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

  @bind
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