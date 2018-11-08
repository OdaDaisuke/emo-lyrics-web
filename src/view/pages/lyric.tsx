import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { FaTwitter } from 'react-icons/fa'
import { LyricService, Tracker, AccountService } from '../../domain'
import * as interfaces from '../../interfaces'
import { PlayButton, FavoriteButton, BadgeButton } from '../atoms'
import { FullWidthLayout } from '../layouts'
import { MediaBreakPointUp } from '../styles'
import { RouteController } from '../../route/controller'
import * as configs from '../../configs'

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
          <FavoriteButton
              className={css(this.styles.favButton)}
              onClick={this.props.vm.onClickFavButton}
              favorited={this.props.vm.favorited}
            />
        </div>
        <div className={css(this.styles.opBtnGroup)}>
          <span
            className={css(this.styles.backLabel)}
            onClick={this.props.vm.onClickBackPage
          }>&lt; 一覧へ</span>
          <PlayButton
            className={css(this.styles.playButton)}
            link={this.props.vm.lyric.Url}
          />
        </div>
        <div className={css(this.styles.share)}>
          <BadgeButton link={this.tweetLink} type="tweet">
            <FaTwitter size={18} color="#fff" />
          </BadgeButton>
        </div>
      </div>
    )
  }

  get tweetLink() {
		if(!this.props.vm.lyric) {
			return ""
    }
    const lyric = this.props.vm.lyric
		let lyricLabel = lyric.Lyric.substr(0, 80)
		if(lyricLabel.length > 80) {
			lyricLabel += "..."
		}
		return `https://twitter.com/intent/tweet?url=${configs.env.siteUrl}&text=「${lyric.Lyric}」&hashtags=歌詞から曲を好きになる`
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
        [MediaBreakPointUp.SM]: {
					margin: '0 auto',
					maxWidth: 720,
					width: '75%',
				},
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
        [MediaBreakPointUp.SM]: {
          fontSize: '1.88em',
          marginTop: '-12vh',
          textAlign: 'center',
        },
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
        marginBottom: 8,
      },
      backLabel: {
        cursor: 'pointer',
        fontSize: '0.9em',
        letterSpacing: 2,
        marginLeft: -70,
      },
      playButton: {
        marginLeft: 20,
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
      share: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: -50,
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

  @observable
  favorited: boolean = false

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
    this.setFavoriteStatus()
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
      this.favorited = false
			return null
    }
    this.favorited = true
    this.accountService.postFav(this.lyric.ID)
	}

	setFavoriteStatus() {
		if(!this.favs) { return false }
    if(!this.lyric) { return false }
    const lyric = this.lyric

    let favorited = false
		this.favs.map((fav: interfaces.Fav) => {
			if(fav.LyricID == lyric.ID) {
				favorited = true
			}
		})
		this.favorited = favorited
	}

}