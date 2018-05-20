import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain/lyric'
import { LyricProps } from '../../data'
import { LyricCard } from '../molecules'

export interface LyricCardListProps {
  vm: LyricCardListVM
}

@observer
export class LyricCardList extends React.Component<LyricCardListProps, any> {
  constructor(props: any) {
    super(props)
    this.props.vm.initialize()
    this.props.vm.getLyrics()
  }

  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
	{this.lyricList}
      </div>
    )
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
	height: '96vh',
	position: 'relative',
	width: '100vw',
      },
    })
  }

  get lyricList() {
    if(!this.props.vm.lyrics) {
      return null
    }
    const dom = this.props.vm.lyrics.map((lyrics: LyricProps) => {
      return (
	<LyricCard
	  title={lyrics.Title}
	  content={lyrics.Content}
	  singer={lyrics.Singer}
	  url={lyrics.Url}
	  key={lyrics.Content}
	/>
      )
    })
    return dom
  }

}

export class LyricCardListVM {
  lyricService: LyricService | null = null

  @observable
  lyricIdx: number = 0

  @observable
  lyrics: LyricProps[] | null = null

  initialize() {
    this.lyricService = new LyricService()
  }

  getLyrics() {
    if(!this.lyricService) {
      return null
    }
    this.lyricService.get(this.getLyricsCallback)
  }

  @bind
  getLyricsCallback(lyrics: LyricProps[]) {
    this.lyrics = lyrics
  }

}
