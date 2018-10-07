import * as React from 'react'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { FaTwitter } from 'react-icons/fa'
import * as configs from '../../configs'
import { LyricCard } from '../molecules'
import { Lyric } from '../../interfaces'
import { Button, BadgeButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'

export interface ILyricCardList {
  onLast: any
  lyrics: Lyric[] | null
  lyricIdx: number
  isAtFirst: boolean
  isAtLast: boolean
  onClickNext: () => void
  onClickPrev: () => void
}

@observer
export class LyricCardList extends React.Component<ILyricCardList, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.styles.container)}>
        {this.innerContainer}
        <div className={css(this.styles.share)}>
          <h4 className={css(this.styles.blockCaption)}>気に入ったらシェア</h4>
          <BadgeButton link={this.tweetLink} type="tweet">
            <FaTwitter color="#fff" />
          </BadgeButton>
        </div>
      </div>
    )
  }

	get tweetLink() {
		if(!this.props.lyrics) {
			return ""
    }
    const lyric = this.props.lyrics[this.props.lyricIdx]
		let lyricLabel = lyric.Lyric.substr(0, 80)
		if(lyricLabel.length > 80) {
			lyricLabel += "..."
		}
		return `https://twitter.com/intent/tweet?url=${configs.env.siteUrl}&text=「${lyric}」&hashtags=エモ詩&via=hinodeya_pon`
	}  

  @bind
  handleNext() {
    this.props.onClickNext()
    if(this.props.isAtLast) {
       this.props.onLast()
    }
  }

  @bind
  handlePrev() {
    this.props.onClickPrev()
  }

  get innerContainer() {
    if(!this.props.lyrics) {
      return null
    }
    const curLyric = this.props.lyrics[this.props.lyricIdx]
    return (
      <div className={css(this.styles.innerContainer)}>
        <LyricCard
          title={curLyric.Title}
          lyric={curLyric.Lyric}
          singer={curLyric.Singer}
          url={curLyric.Url}
          key={curLyric.Lyric}
        />
        <div className={css(this.styles.pagingBtnGroup)}>
          {this.prevButton}
          {this.nextButton}
        </div>
      </div>
    )
  }

  get prevButton() {
    if(!this.props.isAtFirst) {
      return (
        <Button
          className={css(this.styles.prevButton)}
          onClick={this.handlePrev}>{"戻る"}</Button>
      )
    }
  }

  get nextButton() {
    if(!this.props.isAtLast) {
      return (
        <Button
          enableNextArrow={true}
          className={css(this.styles.nextButton)}
          onClick={this.handleNext}>次の歌詞へ</Button>
      )
    }
  }

  get styles() {
    return StyleSheet.create({
      container: {
        boxSizing: 'border-box',
        padding: '10vh 0 20px',
        position: 'relative',
        width: '100vw',
      },
      innerContainer: {
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
      },
      pagingBtnGroup: {
        display: 'flex',
        justifyContent: 'center',
        marginRight: -10,
        width: '100%',
        [MediaBreakPointUp.SM]: {},
      },
      prevButton: {
        backgroundImage: 'linear-gradient(-135deg, #B27D8F 0%, #7D5261 100%)',
        boxShadow: '0 2px 10px -4px rgba(0,0,0,0.50)',
        flex: '0 1 33.3%',
        marginLeft: 0,
        marginRight: 0,
      },
      nextButton: {
        flex: '0 1 66.666%',
      },
      share: {
        textAlign: 'center',
      },
      blockCaption: {
        color: '#6f6f8f',
        fontSize: 18,
        fontWeight: 300,
        letterSpacing: 2,
        marginTop: 25,
        marginBottom: 15,
      },
    })
  }

}