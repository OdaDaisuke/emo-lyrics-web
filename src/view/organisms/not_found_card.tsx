import * as React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain'
import { LyricCard } from '../molecules'
import { Lyric } from '../../interfaces/lyric'
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
        {this.lyricCard}
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
          marginTop: '120px',
          marginBottom: '-120px',
        },
      },
    })
  }

  get lyricCard() {
    if(!this.props.vm.notFoundLyric) {
      return null
    }
    return (
      <LyricCard
        title={this.props.vm.notFoundLyric.Title}
        lyric={this.props.vm.notFoundLyric.Lyric}
        singer={this.props.vm.notFoundLyric.Singer}
        url={this.props.vm.notFoundLyric.Url}
      />
    )
  }

}

export class NotFoundCardVM {
  private lyricService: LyricService | null = null

  @observable.ref
  notFoundLyric: Lyric | null = null

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
