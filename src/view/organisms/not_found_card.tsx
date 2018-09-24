import * as React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain'
import { LyricCard } from '../molecules'
import { MediaBreakPointUp } from '../styles'

export interface INotFoundCard {
  vm: NotFoundCardVM
  lyricService: LyricService
}

@observer
export class NotFoundCard extends React.Component<INotFoundCard, any> {
  constructor(props: INotFoundCard) {
    super(props)
    this.props.vm.initialize(props.lyricService)
    this.props.vm.fetchNotFoundLyric()
  }

  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
	<h2 className={css(this.style.caption)}>404 Page not found</h2>
	<LyricCard
	  title={this.lyricTitle}
	  content={this.lyricContent}
	  singer={this.lyricSinger}
	  url={this.lyricUrl}
	/>
      </div>
    )
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
        height: '90vh',
        textAlign: 'center',
      },
      caption: {
        color: '#4f4f5f',
        fontSize: '2.2rem',
        fontStyle: 'italic',
        fontWeight: 'lighter',
        letterSpacing: '5px',
        marginTop: '80px',
        marginBottom: '-80px',
        [MediaBreakPointUp.SM]: {
          fontSize: '1.2rem',
        },
      },
    })
  }

  get lyricTitle() {
    return this.lyric("Title")
  }

  get lyricContent() {
    return this.lyric("Content")
  }

  get lyricSinger() {
    return this.lyric("Singer")
  }

  get lyricUrl() {
    return this.lyric("Url")
  }

  private lyric(key: string) {
    if(!this.props.vm.notFoundLyric) {
      return ""
    }
    return this.props.vm.notFoundLyric.$mobx.values[0][key]
  }
}

export class NotFoundCardVM {
  private lyricService: LyricService | null = null

  @observable
  notFoundLyric: any = null

  initialize(lyricService: LyricService) {
    this.lyricService = lyricService
  }

  async fetchNotFoundLyric() {
    if(!this.lyricService) {
      return null
    }
    this.notFoundLyric = await this.lyricService.fetchNotFoundLyric()
  }

}
