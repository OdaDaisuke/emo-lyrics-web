import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { MediaBreakPointUp } from '../styles'
import { LyricCard } from '../molecules'
import { LyricService } from '../../domain'
import { Lyric } from '../../interfaces'

export interface INotFoundPageProps {
  vm: NotFoundPageVM
}

@observer
export class NotFoundPage extends React.Component<INotFoundPageProps, any> {
  render():JSX.Element {
    return (
      <div className={css(this.styles.container)}>
        <h2 className={css(this.styles.caption)}>404 Page not found</h2>
        {this.lyricCard}
      </div>
    )
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

  get styles() {
    return StyleSheet.create({
      container: {
        height: '90vh',
        textAlign: 'center',
      },
      caption: {
        color: '#4f4f5f',
        fontSize: '1.27em',
        fontStyle: 'italic',
        fontWeight: 'lighter',
        letterSpacing: '5px',
        marginTop: '50px',
        marginBottom: '-50px',
        [MediaBreakPointUp.SM]: {
          fontSize: '1.2rem',
          marginTop: '120px',
          marginBottom: '-120px',
        },
      },
    })
  }

}

export class NotFoundPageVM {
  private lyricService: LyricService

  @observable.ref
  notFoundLyric: Lyric | null = null

  constructor(lyricService: LyricService) {
    this.lyricService = lyricService

    this.fetchNotFoundLyric()
  }


  async fetchNotFoundLyric() {
    if(!this.lyricService) {
      return null
    }
    this.notFoundLyric = await this.lyricService.fetchNotFoundLyric()
  }

}
