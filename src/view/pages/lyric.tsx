import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService, Tracker } from '../../domain'
import * as interfaces from '../../interfaces'
import { LyricCardList } from '../organisms'

export interface ILyricPageProps {
  history: any
  vm: LyricPageVM
}

@observer
export class LyricPage extends React.Component<ILyricPageProps, any> {
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
        <p className={css(this.styles.emptyStatusLabel)}>歌詞が取得できませんでした。</p>
      )
    }

    return (
      <LyricCardList
        onLast={this.onLast}
        lyrics={this.props.vm.lyrics}
        lyricIdx={this.props.vm.lyricIdx}
        isAtLast={this.props.vm.isAtLast}
        isAtFirst={this.props.vm.isAtFirst}
        onClickNext={this.props.vm.onClickNext}
        onClickPrev={this.props.vm.onClickPrev}
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
  private tracker: Tracker | null = null

  @observable
  lyricIdx: number = 0

  @observable.ref
  lyrics: interfaces.Lyric[] | null = null

  @observable
  isAtLast: boolean = false

  @observable
  isAtFirst: boolean = true

  constructor(lyricService: LyricService, tracker: Tracker) {
    this.lyricService = lyricService
    this.tracker = tracker
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
  onClickNext() {
    if(!this.lyrics) {
      return
    }

    this.beforeChangeLyric()
    this.tracker!.trackLeaveLyric(this.lyrics[this.lyricIdx].Id)

    const nextIdx = this.lyricIdx + 1
    if(nextIdx < this.lyrics.length) {
      this.lyricIdx = nextIdx
    }

    if(nextIdx + 1 == this.lyrics.length) {
      this.isAtLast = true
    } else {
      this.isAtLast = false
    }

    this.onChangeLyric()
  }

  @bind
  onClickPrev() {
    this.beforeChangeLyric()
    if(this.lyrics) {
      this.tracker!.trackLeaveLyric(this.lyrics[this.lyricIdx].Id)
    }

    const prevIdx = this.lyricIdx - 1
    if(prevIdx >= 0) {
      this.lyricIdx = prevIdx
    }
    this.onChangeLyric()
  }

  private beforeChangeLyric() {
    this.tracker!.trackLyricView(this.lyricIdx)
  }

  private onChangeLyric() {
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