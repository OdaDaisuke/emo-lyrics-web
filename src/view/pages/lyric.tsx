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

export interface ILyricPageProps {
  history: any
  vm: LyricPageVM
}

@observer
export class LyricPage extends React.Component<ILyricPageProps, any> {
  render(): JSX.Element {
    return (
      <FullWidthLayout
        className={css(this.styles.container)}
        innerContainerClassName={css(this.styles.innerContainer)}
        isAuthed={this.props.vm.isAuthed}
      >
        <div className={css(this.styles.stardustTopRight)}>
          <img src="/assets/images/stardust_top_right.svg" className={css(this.styles.stardustTopRightImg)} />
        </div>
        <div className={css(this.styles.stardustBottomLeft)}>
          <img src="/assets/images/stardust_bottom_left.svg" className={css(this.styles.stardustBottomLeftImg)} />
        </div>
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
        <p className={css(this.styles.lyricLabel)}>{this.props.vm.lyric.Lyric}</p>
        <div className={css(this.styles.lyricDetail)}>
          <span className={css(this.styles.title)}>{this.props.vm.lyric.Title}</span>
          <span className={css(this.styles.singer)}>{this.props.vm.lyric.Singer}</span>
        </div>
        <div className={css(this.styles.opBtnGroup)}>
          <span
            className={css(this.styles.backLabel)}
            onClick={this.props.vm.onClickBackPage
          }>{"< 戻る"}</span>
          <PlayButton
            className={css(this.styles.playButton)}
            link={this.props.vm.lyric.Url}
          />
          <FavoriteButton
            className={css(this.styles.favButton)}
            onClick={this.props.vm.onClickFavButton}
            favorited={this.props.vm.favorited}
          />
        </div>
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
      stardustBottomLeft: {
				bottom: -4,
				left: 0,
				position: 'absolute',
			},
			stardustBottomLeftImg: {
				width: 150,
			},
			stardustTopRight: {
				position: 'absolute',
				right: 0,
				top: 0,
			},
			stardustTopRightImg: {
				width: 150,
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

  @observable.ref
  favs: interfaces.Fav[] | null = null

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
    this.loadFavs()
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
    if(!this.lyric) {
      return null
    }

    if(this.favorited) {
      this.accountService.unFav(this.lyric.ID)
			return null
		}
    this.accountService.postFav(this.lyric.ID)
	}

	get favorited() {
		if(!this.favs) { return false }
    if(!this.lyric) { return false }
    const lyric = this.lyric

    let favorited = false
		this.favs.map((fav: interfaces.Fav) => {
			if(fav.LyricID == lyric.ID) {
				favorited = true
			}
		})
		return favorited
	}

}