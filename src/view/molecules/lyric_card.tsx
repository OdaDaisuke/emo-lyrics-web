import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { bind } from 'bind-decorator'
import { FavoriteButton, PlayButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'
import { Lyric, Fav } from '../../interfaces'

export interface LyricCardProps {
	title: string
	lyric: string
	singer: string
	url: string
	favs?: Fav[] | null
	lyricObj: Lyric | null
	onClickLyric: () => void
	onClickFav: () => void
	onClickUnfav: () => void
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
	render(): JSX.Element {
		return (
			<div className={css(this.styles.container)}>
				<p onClick={this.props.onClickLyric} className={css(this.styles.lyric)}>
					{this.props.lyric}
				</p>
				<div className={css(this.styles.flexRow)}>
					<PlayButton
						link={this.props.url}
						className={css(this.styles.playButton)}
					/>
					<div className={css(this.styles.detailWrap)}>
						<span className={css(this.styles.title)}>{this.props.title}</span>
						<span className={css(this.styles.singer)}>{this.props.singer}</span>
					</div>
					<FavoriteButton
						favorited={this.favorited}
						onClick={this.onClickFavButton}
					/>
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
			if(fav.LyricID == this.props.lyricObj!.ID) {
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
				backgroundImage: 'linear-gradient(-135deg, #F24E86 0%, #D42360 100%)',
				borderRadius: 4,
				boxSizing: 'border-box',
				color: '#fff',
				display: 'flex',
				flexWrap: 'wrap',
				height: '100%',
				minHeight: 300,
				padding: '20px 20px',
				width: '100%',
			},
			flexRow: {
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'flex-start',
				width: '100%',
			},
			detailWrap: {
				flex: '0 1 80%',
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
				marginLeft: 10,
				marginRight: 8,
			},
		})
	}

}

