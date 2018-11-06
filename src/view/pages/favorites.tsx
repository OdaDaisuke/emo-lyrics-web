import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService, Tracker, AccountService } from '../../domain'
import * as interfaces from '../../interfaces'
import { FullWidthLayout } from '../layouts'
import { RouteController } from '../../route/controller'
import { LyricCard } from '../molecules';

export interface IFavoritesPageProps {
  vm: FavoritesPageVM
}

@observer
export class FavoritesPage extends React.Component<IFavoritesPageProps, any> {
  render(): JSX.Element {
    return (
      <FullWidthLayout
        className={css(this.styles.container)}
        innerContainerClassName={css(this.styles.innerContainer)}
        isAuthed={this.props.vm.isAuthed}
      >
        {this.renderMmain}
      </FullWidthLayout>
    )
  }

  get renderMmain() {
    if(!this.props.vm.favs) {
      return (
        <p className={css(this.styles.emptyStatusLabel)}>お気に入りが取得できませんでした。</p>
      )
    }

    return this.renderLyrics
  }

  get renderLyrics() {
    if(!this.props.vm.favs) {
      return
    }
    console.log(this.props.vm.favs)
    return this.props.vm.favs.map((fav, idx) => {
      return <LyricCard
        lyric={fav.lyric}
        onClickLyric={this.props.vm.onClickLyric}
        onClickFav={() => null}
        onClickUnfav={() => null}
        key={idx}>{fav.LyricID}</LyricCard>
    })
  }

  get styles() {
    return StyleSheet.create({
      container: {
        backgroundColor: '#2F2F41',
        minHeight: '97vh',
      	position: 'relative',
      },
      innerContainer: {
        color: '#fff',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '87%',
      },
      emptyStatusLabel: {
        color: '#fff',
        fontSize: '0.9em',
        letterSpacing: '1px',
        marginTop: '3em',
      },
    })
  }

}

export class FavoritesPageVM {
  private lyricService: LyricService | null = null
  private accountService: AccountService | null = null
  private routeController: RouteController
  private tracker: Tracker | null = null

  @observable
  isAuthed: boolean = false

  @observable.ref
  favs: interfaces.Fav[] | null = null

  @observable
  favIdx: number = -1

  constructor(
    accountService: AccountService,
    lyricService: LyricService,
    tracker: Tracker,
    routeController: RouteController,
  ) {
    this.lyricService = lyricService
    this.accountService = accountService
    this.tracker = tracker
    this.routeController = routeController

    this.isAuthed = this.accountService.isAuthed
    this.loadFavs()
  }

  async loadFavs() {
    if(!this.accountService) {
      return
    }
    this.favs = await this.accountService.fetchMyFavs()
  }

	@bind
	onClickLyric() {
  }

}