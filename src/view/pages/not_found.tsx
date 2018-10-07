import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { bind } from 'bind-decorator'
import { MediaBreakPointUp } from '../styles'
import { LyricCard } from '../molecules'
import { FullWidthLayout } from '../layouts'
import { LyricService } from '../../domain'
import { Lyric } from '../../interfaces'

export interface INotFoundPageProps {
  vm: NotFoundPageVM
}

@observer
export class NotFoundPage extends React.Component<INotFoundPageProps, any> {
  render():JSX.Element {
    return (
      <FullWidthLayout className={css(this.styles.container)} isAuthed={this.props.vm.isAuthed}>
        <h2 className={css(this.styles.caption)}>404 Page not found</h2>
        <div className={css(this.styles.innerContainer)}>
          {this.lyricCard}
        </div>
      </FullWidthLayout>
    )
  }

  get lyricCard() {
    if(!this.props.vm.notFoundLyric) {
      return null
    }

    return (
      <LyricCard
        onClickLyric={this.props.vm.onClickLyric}
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
      innerContainer: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '90%',
      },
      caption: {
        color: '#4f4f5f',
        fontSize: '1.27em',
        fontStyle: 'italic',
        fontWeight: 200,
        letterSpacing: 5,
        marginTop: 50,
        marginBottom: 50,
        [MediaBreakPointUp.SM]: {
          fontSize: '1.2rem',
          marginTop: 100,
          marginBottom: 100,  
        },
      },
    })
  }

}

export class NotFoundPageVM {
  private lyricService: LyricService

  @observable.ref
  notFoundLyric: Lyric | null = null

  @observable
  isAuthed: boolean = false

  constructor(lyricService: LyricService) {
    this.lyricService = lyricService

    this.fetchNotFoundLyric()
  }

  @bind
  onClickLyric() {
  }

  async fetchNotFoundLyric() {
    if(!this.lyricService) {
      return null
    }
    this.notFoundLyric = await this.lyricService.fetchNotFoundLyric()
  }

}
