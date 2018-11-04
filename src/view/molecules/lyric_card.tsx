import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { bind } from 'bind-decorator'
import { FavoriteButton, PlayButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'
import { Lyric, Fav } from '../../interfaces'

export interface LyricCardProps {
	lyric: Lyric | null
	onClickLyric: () => void
	onClickFav: () => void
	onClickUnfav: () => void
	favs?: Fav[] | null
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
	render(): JSX.Element {
		if(!this.props.lyric) {
			return <span></span>
		}
		return (
			<div className={css(this.styles.container)}>
				<div className={css(this.styles.favWrap)}>
					<FavoriteButton
						favorited={this.favorited}
						onClick={this.onClickFavButton}
					/>
				</div>
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

	@bind
	onClickFavButton() {
		if(this.favorited) {
			this.props.onClickUnfav()
			return
		}
		this.props.onClickFav()
	}

	get favorited() {
		if(!this.props.favs) {
			return false
		}
		let favorited = false
		this.props.favs.map((fav: Fav) => {
			if(fav.LyricID == this.props.lyric!.ID) {
				favorited = true
			}
		})
		return favorited
	}

	get styles() {
		return StyleSheet.create({
			container: {
				alignContent: 'center',
				alignItems: 'center',
				backgroundImage: '#fff',
				borderRadius: 4,
				boxSizing: 'border-box',
				color: '#fff',
				display: 'flex',
				flexWrap: 'wrap',
				height: '100%',
				minHeight: 300,
				padding: '20px 20px',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					margin: '0 auto',
					maxWidth: 720,
					width: '75%',
				},
			},
			flexRow: {
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'flex-start',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					justifyContent: 'center',
				},
			},
			detailWrap: {
				flex: '0 1 80%',
				[MediaBreakPointUp.SM]: {
					display: 'inline',
					flex: '1 !important',
					textAlign: 'left',
				},
			},
			lyric: {
				color: '#fff',
				fontSize: 17,
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
			},
			playButtonWrap: {
				[MediaBreakPointUp.SM]: {
					display: 'flex',
					flex: 1,
					justifyContent: 'flex-end',
				},
			},
			favWrap: {
				textAlign: 'right',
				width: '100%',
			},
		})
	}

}

