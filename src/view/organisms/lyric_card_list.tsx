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
  lyrics: Lyric[] | null
  lyricIdx: number
  isAtFirst: boolean
  isAtLast: boolean
  onClickLyric: any
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

  get innerContainer() {
    if(!this.props.lyrics) {
      return null
    }
    const curLyric = this.props.lyrics[this.props.lyricIdx]
    return (
      <div className={css(this.styles.innerContainer)}>
        <LyricCard
          onClickLyric={this.props.onClickLyric}
          title={curLyric.Title}
          lyric={curLyric.Lyric}
          singer={curLyric.Singer}
          url={curLyric.Url}
          key={curLyric.Lyric}
        />
      </div>
    )
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