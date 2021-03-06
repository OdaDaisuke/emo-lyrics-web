import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService, Tracker, AccountService } from '../../domain'
import { FaTwitter } from 'react-icons/fa'
import { BadgeButton } from '../atoms'
import * as interfaces from '../../interfaces'
import * as configs from '../../configs'
import { LyricCardList } from '../organisms'
import { PagingBtnGroup } from '../molecules'
import { FullWidthLayout } from '../layouts'
import { RouteController } from '../../route/controller'
import { MediaBreakPointUp } from '../styles';

export interface ILyricsPageProps {
  history: any
  vm: LyricsPageVM
}

@observer
export class LyricsPage extends React.Component<ILyricsPageProps, any> {
  render(): JSX.Element {
    return (
      <FullWidthLayout isAuthed={this.props.vm.isAuthed}>
        {this.mainContent}
      </FullWidthLayout>
    )
  }

  get containerClass() {
    return [
      css(this.styles.container),
      !this.props.vm.lyrics && css(this.styles.emptyStatusContainer),
    ].join(' ')
  }

  get mainContent() {
    if(!this.props.vm.lyrics) {
      return (
        <p className={css(this.styles.emptyStatusLabel)}>歌詞を取得中です。</p>
      )
    }

    return (
      <div>
        <LyricCardList
          onClickLyric={this.props.vm.onClickLyric}
          onClickFav={this.props.vm.onClickFav}
          onClickUnfav={this.props.vm.onClickUnfav}
          favs={this.props.vm.favs}
          lyrics={this.props.vm.lyrics}
          lyricIdx={this.props.vm.lyricIdx}
          isAtLast={this.props.vm.isAtLast}
          isAtFirst={this.props.vm.isAtFirst}
        />
        <PagingBtnGroup
          isAtFirst={this.props.vm.isAtFirst}
          isAtLast={this.props.vm.isAtLast}
          onClickNext={this.onClickNext}
          onClickPrev={this.props.vm.onClickPrev}
        />
        <div className={css(this.styles.share)}>
          <h4 className={css(this.styles.blockCaption)}>気に入ったらシェア</h4>
          <BadgeButton link={this.tweetLink} type="tweet">
            <FaTwitter size={18} color="#fff" />
          </BadgeButton>
        </div>
      </div>
    )
  }

  @bind
  onClickNext() {
    if(this.props.vm.isAtLast) {
      this.props.history.push('/thanks')
      return
    }

    this.props.vm.onClickNext()
  }

  get tweetLink() {
		if(!this.props.vm.lyrics) {
			return ""
    }
    const lyric = this.props.vm.lyrics[this.props.vm.lyricIdx]
		let lyricLabel = lyric.Lyric.substr(0, 80)
		if(lyricLabel.length > 80) {
			lyricLabel += "..."
		}
		return `https://twitter.com/intent/tweet?url=${configs.env.siteUrl}&text=「${lyric.Lyric}」&hashtags=歌詞から曲を好きになる`
	}  

  get styles() {
    return StyleSheet.create({
      container: {
      	position: 'relative',
      },
      emptyStatusContainer: {
        textAlign: 'center',
      },
      emptyStatusLabel: {
        color: '#fff',
        display: 'block',
        fontSize: '0.9em',
        letterSpacing: '1px',
        marginTop: '3em',
        textAlign: 'center',
      },
      share: {
        backgroundColor: '#3d3d50',
        borderRadius: 2,
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 40,
        justifyContent: 'center',
        padding: '37px 0',
        [MediaBreakPointUp.SM]: {
          margin: '30px auto 0',
          maxWidth: 500,
          width: '80%',
        },
      },
      blockCaption: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 300,
        letterSpacing: 2,
        marginTop: 0,
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
      },
    })
  }

}

export class LyricsPageVM {
  private lyricService: LyricService | null = null
  private accountService: AccountService | null = null
  private routeController: RouteController
  private tracker: Tracker | null = null

  @observable
  isAuthed: boolean = false

  @observable
  lyricIdx: number = 0

  @observable.ref
  lyrics: interfaces.Lyric[] | null = null

  @observable.ref
  favs: interfaces.Fav[] | null = null

  @observable
  isAtLast: boolean = false

  @observable
  isAtFirst: boolean = true

  constructor(
    lyricService: LyricService,
    accountService: AccountService,
    tracker: Tracker,
    routeController: RouteController
  ) {
    this.lyricService = lyricService
    this.accountService = accountService
    this.tracker = tracker
    this.routeController = routeController
    this.isAuthed = this.accountService.isAuthed

    this.fetchFavs()
    this.fetchLyrics()
  }

  async fetchLyrics() {
    if(!this.lyricService) {
      return null
    }
    const lyrics = await this.lyricService.fetchLyric()
    this.lyrics = this.lyricService.shuffle(lyrics)
  }

  async fetchFavs() {
    if(!this.accountService) {
      return null
    }
    this.favs = await this.accountService.fetchMyFavs()
  }

  @bind
  onClickLyric() {
    //クリックしたらlyric_detailに飛ばす
    if(!this.lyrics) {
      return null
    }
    const lyric = this.lyrics[this.lyricIdx]
    this.routeController.push(`/lyric/${lyric.ID}`)
  }

  @bind
  async onClickFav() {
    if(!this.lyrics || !this.accountService || !this.favs) {
      return null
    }
    const l = this.lyrics[this.lyricIdx]
    await this.accountService.postFav(l.ID)

    this.favs.push({
      ID: "",
      LyricID: l.ID,
      lyric: null,
    })

  }

  @bind
  async onClickUnfav() {
    if(!this.lyrics || !this.accountService || !this.favs) {
      return null
    }
    const l = this.lyrics[this.lyricIdx]
    await this.accountService.unFav(l.ID)

    this.favs.map((fav, idx) => {
      if(fav.LyricID === l.ID && this.favs) {
        this.favs.slice(idx, 1)
      }
    })
  }

  onClickNext() {
    if(!this.lyrics) {
      return
    }

    this.beforeChangeLyric()

    const nextIdx = this.lyricIdx + 1
    if(nextIdx < this.lyrics.length) {
      this.lyricIdx = nextIdx
    }

    if(nextIdx + 1 == this.lyrics.length) {
      this.isAtLast = true
    } else {
      this.isAtLast = false
    }

    this.onChangeLyric()
  }

  @bind
  onClickPrev() {
    this.beforeChangeLyric()

    const prevIdx = this.lyricIdx - 1
    if(prevIdx >= 0) {
      this.lyricIdx = prevIdx
    }
    this.onChangeLyric()
  }

  private beforeChangeLyric() {
    this.tracker!.trackLyricView(this.lyricIdx)
  }

  private onChangeLyric() {
    if(!this.lyrics) {
      return
    }

    // At last?
    if(this.lyricIdx + 1 == this.lyrics.length || this.lyrics.length == 1) {
      this.isAtLast = true
    } else {
      this.isAtLast = false
    }

    // At first?
    if(this.lyricIdx == 0) {
      this.isAtFirst = true
    } else {
      this.isAtFirst = false
    }

  }

}