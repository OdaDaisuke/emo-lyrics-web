import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService, Tracker, AccountService } from '../../domain'
import * as interfaces from '../../interfaces'
import { LyricCardList } from '../organisms'
import { PagingBtnGroup } from '../molecules'
import { FullWidthLayout } from '../layouts'
import { RouteController } from '../../route/controller'

export interface ILyricPageProps {
  history: any
  vm: LyricPageVM
}

@observer
export class LyricPage extends React.Component<ILyricPageProps, any> {
  render(): JSX.Element {
    return (
      <FullWidthLayout isAuthed={this.props.vm.isAuthed}>
        {this.mainContent}
      </FullWidthLayout>
    )
  }

  get mainContent() {
    if(!this.props.vm.lyric) {
      return (
        <p className={css(this.styles.emptyStatusLabel)}>歌詞が取得できませんでした。</p>
      )
    }

    return (
      <div>
        {this.props.vm.lyric.Lyric}
      </div>
    )
  }

  get styles() {
    return StyleSheet.create({
      container: {
      	position: 'relative',
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
  private accountService: AccountService | null = null
  private routeController: RouteController
  private tracker: Tracker | null = null

  @observable
  isAuthed: boolean = false

  @observable.ref
  lyricId: number = 0

  @observable
  lyric: interfaces.Lyric | null = null

  @observable
  isAtLast: boolean = false

  @observable
  isAtFirst: boolean = true

  constructor(
    lyricService: LyricService,
    accountService: AccountService,
    tracker: Tracker,
    routeController: RouteController,
    lyricId: number
  ) {
    this.lyricService = lyricService
    this.accountService = accountService
    this.tracker = tracker
    this.routeController = routeController
    this.lyricId = lyricId
    this.loadLyric()
    this.isAuthed = this.accountService.isAuthed
  }

  async loadLyric() {
    if(!this.lyricService) {
      return null
    }
    const lyrics = await this.lyricService.fetchLyric()
    const lyric = lyrics.filter(l => {
      if(l.ID == this.lyricId) { return l }
    })
    this.lyric = lyric[0]
  }

}