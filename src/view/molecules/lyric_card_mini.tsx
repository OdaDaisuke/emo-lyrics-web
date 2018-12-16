import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { PlayButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'
import { Lyric } from '../../interfaces'

export interface LyricCardMiniProps {
	lyric: Lyric | null
	onClickLyric: () => void
}

@observer
export class LyricCardMini extends React.Component<LyricCardMiniProps, any> {
	render(): JSX.Element {
		if(!this.props.lyric) {
			return <span></span>
		}
		return (
			<div className={css(this.styles.container)}>
				<p onClick={this.props.onClickLyric} className={css(this.styles.lyric)}>
					{this.props.lyric.Lyric}
				</p>
				<div className={css(this.styles.flexRow)}>
					<div className={css(this.styles.playButtonWrap)}>
						<PlayButton
							link={this.props.lyric.Url}
							className={css(this.styles.playButton)}
					/>
					</div>
					<div className={css(this.styles.detailWrap)}>
						<span className={css(this.styles.title)}>{this.props.lyric.Title}</span>
						<span className={css(this.styles.singer)}>{this.props.lyric.Singer}</span>
					</div>
				</div>
			</div>
		)
	}

	get styles() {
		return StyleSheet.create({
			container: {
				alignContent: 'center',
				alignItems: 'center',
				backgroundImage: '#fff',
				border: '1px solid #fff',
				borderRadius: 4,
				boxSizing: 'border-box',
				color: '#fff',
				cursor: 'pointer',
				display: 'flex',
				flexWrap: 'wrap',
				height: '100%',
				marginTop: 15,
				marginBottom: 15,
				padding: '20px 20px',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					marginTop: 22,
					marginBottom: 22,
				},
			},
			flexRow: {
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'flex-start',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					justifyContent: 'flex-start',
				},
			},
			detailWrap: {
				flex: '0 1 80%',
				[MediaBreakPointUp.SM]: {
					display: 'inline',
					flex: 'auto !important',
					textAlign: 'left',
				},
			},
			lyric: {
				color: '#fff',
				fontSize: 15,
				fontWeight: 200,
				letterSpacing: 2,
				lineHeight: 2,
				marginTop: 0,
				[MediaBreakPointUp.SM]: {
					fontSize: '1.58rem',
				},
			},
			title: {
				display: 'block',
				fontSize: '0.8rem',
				fontWeight: 500,
				letterSpacing: 1,
				lineHeight: 1.55,
				marginRight: '1rem',
				marginBottom: 5,
				width: '100%',
				[MediaBreakPointUp.SM]: {
					display: 'block',
					fontSize: '0.8rem',
					marginBottom: '2px',
					width: '100%',
				},
			},
			singer: {
				fontSize: '0.8rem',
				fontWeight: 200,
				letterSpacing: 1,
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
			playButton: {
				marginLeft: 6,
				marginRight: 10,
				[MediaBreakPointUp.SM]: {
					marginLeft: -15,
				},
			},
			playButtonWrap: {
				[MediaBreakPointUp.SM]: {
					display: 'flex',
					flex: '0',
					marginLeft: 15,
				},
			},
			favWrap: {
				textAlign: 'right',
				width: '100%',
			},
		})
	}

}

