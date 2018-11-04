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
        onClickFav={this.props.vm.onClickFav}
        onClickUnfav={this.props.vm.onClickUnfav}
        lyric={this.props.vm.notFoundLyric}
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
        color: '#fff',
        fontSize: '1.27em',
        fontStyle: 'italic',
        fontWeight: 200,
        letterSpacing: 5,
        marginTop: 50,
        marginBottom: 40,
        [MediaBreakPointUp.SM]: {
          fontSize: '1.92rem',
          marginTop: 100,
          marginBottom: 60,  
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

  @bind
  onClickFav() {}

  @bind
  onClickUnfav() {}

  async fetchNotFoundLyric() {
    if(!this.lyricService) {
      return null
    }
    this.notFoundLyric = await this.lyricService.fetchNotFoundLyric()
  }

}
