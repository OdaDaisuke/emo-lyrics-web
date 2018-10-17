import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService, Tracker, AccountService } from '../../domain'
import * as interfaces from '../../interfaces'
import { PlayButton, FavoriteButton } from '../atoms'
import { FullWidthLayout } from '../layouts'
import { RouteController } from '../../route/controller'

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
        {this.mainContent}
      </FullWidthLayout>
    )
  }

  get mainContent() {
    if(!this.props.vm.favs) {
      return (
        <p className={css(this.styles.emptyStatusLabel)}>お気に入りが取得できませんでした。</p>
      )
    }

    return (
      <div>
      </div>
    )
  }

  get styles() {
    return StyleSheet.create({
      container: {
        backgroundColor: '#2F2F41',
        minHeight: '97vh',
      	position: 'relative',
      },
      innerContainer: {
        alignContent: 'center',
        alignItems: 'center',
        color: '#fff',
        display: 'flex',
        height: '97vh',
        justifyContent: 'center',
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
      lyricLabel: {
        fontSize: '1.25em',
        fontWeight: 200,
        letterSpacing: 2,
        lineHeight: 2,
        marginTop: '-15vh',
      },
      lyricDetail: {
        marginBottom: 30,
        textAlign: 'center',
      },
      title: {
        display: 'block',
        fontSize: '0.9em',
        fontWeight: 600,
        letterSpacing: 2,
        lineHeight: 1.65,
        marginBottom: 10,
      },
      singer: {
        display: 'block',
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: 2,
      },
      opBtnGroup: {
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      },
      backLabel: {
        fontSize: '0.9em',
        letterSpacing: 2,
      },
      playButton: {
        marginLeft: 28,
      },
      favButton: {
        marginLeft: 24,
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
    this.loadFavs()
    this.isAuthed = this.accountService.isAuthed
  }

  async loadFavs() {
    if(!this.accountService) {
      return
    }
    this.favs = await this.accountService.fetchMyFavs()
  }

  @bind
  onClickBackPage() {
    this.routeController.backPage()
  }

	@bind
	onClickFavButton() {
    if(!this.accountService) {
      return null
    }
    if(!this.favs) {
      return null
    }

    const curFav = this.favs[this.favIdx].LyricID
    this.accountService.unFav(curFav)
	}
}