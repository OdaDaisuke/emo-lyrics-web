import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { BadgeButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'

export interface LyricCardProps {
	title: string
	lyric: string
	singer: string
	url: string
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
	render(): JSX.Element {
		return (
			<div className={css(this.styles.wrapper)}>
				<div className={css(this.styles.inner)}>
					<p className={css(this.styles.content)}>
						{this.lyric}
					</p>
					<span className={css(this.styles.title)}>「{this.props.title}」</span>
					<span className={css(this.styles.singer)}>{this.props.singer}</span>
					<div>
						<a href={this.props.url} target="_blank">
							<BadgeButton className={css(this.styles.url)}>この曲を聴く</BadgeButton>
						</a>
						<a href={this.tweetLink} target="_blank">
							<BadgeButton type="tweet">tweet</BadgeButton>
						</a>
					</div>
				</div>
			</div>
		)
	}

	get lyric() {
		return this.props.lyric.split("。").map(line => {
			return (
				<React.Fragment key={line}>
					{line}
					<br />
				</React.Fragment>
			)
		})
	}

	get tweetLink() {
		if(!this.props.lyric) {
			return
		}
		let lyric = this.props.lyric.substr(0, 80)
		if(this.props.lyric.length > 80) {
			lyric += "..."
		}
		return `https://twitter.com/intent/tweet?url=${configs.env.siteUrl}&text=「${lyric}」&hashtags=エモ詩&via=hinodeya_pon`
	}

	get styles() {
		return StyleSheet.create({
			wrapper: {
				alignItems: 'center',
				display: 'flex',
				height: '100%',
				width: '100%',
			},
			inner: {
				marginRight: 'auto',
				marginLeft: 'auto',
				maxWidth: '800px',
				textAlign: "left",
				width: '80%',
				[MediaBreakPointUp.SM]: {
					textAlign: 'center',
					width: '85%',
				},
			},
			content: {
				color: '#3f3456',
				fontFamily: 'YuGothic',
				fontSize: '1.08rem',
				fontStyle: 'italic',
				fontWeight: 600,
				letterSpacing: '2px',
				lineHeight: '2',
				marginTop: '0',
				[MediaBreakPointUp.SM]: {
					fontSize: '1.58rem',
				},
			},
			title: {
				color: '#8f8f8f',
				fontSize: '0.8rem',
				fontStyle: 'italic',
				fontWeight: 200,
				marginRight: '1rem',
				letterSpacing: '1px',
				[MediaBreakPointUp.SM]: {
					display: 'block',
					fontSize: '0.8rem',
					marginBottom: '2px',
					width: '100%',
				},
			},
			singer: {
				color: '#8f8f8f',
				fontSize: '0.8rem',
				fontWeight: 200,
				letterSpacing: '1px',
				[MediaBreakPointUp.SM]: {
					fontSize: '0.8rem',
				},
			},
			url: {
				alignItems: "center",
				border: '1px solid #24a8b9',
				color: "#24a8b9",
				borderRadius: "4px",
				display: "inline-block",
				fontSize: "0.8rem",
				fontStyle: "italic",
				fontWeight: 200,
				justifyContent: "center",
				letterSpacing: "1px",
				margin: '20px auto',
				padding: '5px 16px 6px',
				textDecoration: "none",
				transition: 'all 0.2s',
				':hover': {
					backgroundColor: '#24a8b9',
					color: '#fff',
					transform: 'scale(1.05)',
				},
			},
		})
	}

}

