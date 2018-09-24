import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { Button } from '../atoms'
import { MediaBreakPointUp } from '../styles'

export interface LyricCardProps {
  title: string
  content: string
  singer: string
  url: string
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
	render(): JSX.Element {
		return (
			<div className={css(this.style.wrapper)}>
				<div className={css(this.style.inner)}>
					<p className={css(this.style.content)}>
						{this.props.content}
					</p>
					<span className={css(this.style.title)}>「{this.props.title}」</span>
					<span className={css(this.style.singer)}>{this.props.singer}</span>
					<div>
						<a className={css(this.style.url)} href={this.props.url} target="_blank">
							> この曲を聴いてみる
						</a>
						<a href={this.tweetLink} target="_blank">
							<Button type="tweet">tweet</Button>
						</a>
					</div>
				</div>
			</div>
		)
	}

	get tweetLink() {
		let content = this.props.content.substr(0, 80)
		if(this.props.content.length > 80) {
			content += "..."
		}
		return `https://twitter.com/intent/tweet?url=${configs.env.siteUrl}&text=「${content}」&hashtags=エモ詩&via=hinodeya_pon`
	}

  get style() {
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
			width: '85%',
			},
		},
		content: {
			color: '#3f3456',
			fontFamily: 'YuGothic',
			fontSize: '1.5rem',
			fontWeight: 'normal',
			letterSpacing: '2px',
			lineHeight: '1.82',
			marginTop: '0',
			[MediaBreakPointUp.SM]: {
				fontSize: '1.12rem',
			},
		},
      title: {
				color: '#70707f',
				fontStyle: 'italic',
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
				color: '#70707f',
				fontSize: '0.95rem',
				letterSpacing: '1px',
				[MediaBreakPointUp.SM]: {
					fontSize: '0.8rem',
				},
      },
      url: {
				alignItems: "center",
				border: '1px solid #24a8b9',
				color: "#24a8b9",
				borderRadius: "30px",
				display: "inline-block",
				fontSize: "0.8rem",
				fontStyle: "italic",
				fontWeight: 'lighter',
				justifyContent: "center",
				letterSpacing: "1px",
				margin: '20px auto',
				padding: '6px 16px',
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

