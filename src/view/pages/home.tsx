import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { bind } from 'bind-decorator'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Button, SectionCaption, Sentence } from '../atoms'
import { LyricPreviewList } from '../organisms'
import { FullWidthLayout } from '../layouts'
import { AccountService, Tracker } from '../../domain'
import { MediaBreakPointUp } from '../styles'
import { RouteController } from '../../route/controller'

interface IHomeProps {
	vm: HomeVM
	history: any
}

@observer
export class Home extends React.Component<IHomeProps, any> {
    render(): JSX.Element {

        return (
			<>
				<FullWidthLayout
					className={css(this.styles.container)}
					transparentHeader={false}
					isAuthed={this.props.vm.isAuthed}
				>
					<div className={css(this.styles.stardustBottomLeft)}>
						<img src="./assets/images/stardust_bottom_left.svg" className={css(this.styles.stardustBottomLeftImg)} />
					</div>
					<div className={css(this.styles.innerFirstview)}>
						<div className={css(this.styles.textCenter)}>
							<h2 className={css(this.styles.pageTitle)}>
								"5秒"で曲を好きになる
							</h2>
							<p className={css(this.styles.subTitle)}>歌詞が主役の音楽発見サービス<br />エモい歌詞、揃えてます</p>
						</div>
						<LyricPreviewList
							onClickSignin={this.props.vm.signin}
							isAuthed={this.props.vm.isAuthed}
							onClickToTL={this.props.vm.onClickToTL}
						/>
						{this.onboardButtonBlock}
					</div>
				</FullWidthLayout>
				<div className={css(this.styles.sectionWrap)}>
					<div className={css(this.styles.innerContainer)}>
						<div className={css(this.styles.textCenter)}>
							<SectionCaption className={css(this.styles.pink)}>詞はストーリーだ</SectionCaption>
						</div>
						<p className={css(this.styles.lyricSentence)}>{this.lyricSentence}</p>
						<div className={css(this.styles.textCenter)}>
							{this.onboardButton}
						</div>
					</div>
				</div>
				<div className={this.aboutSectionClass}>
					<div className={css(this.styles.stardustTopRight)}>
						<img src="./assets/images/stardust_top_right.svg" className={css(this.styles.stardustTopRightImg)} />
					</div>
					<div className={css(this.styles.innerContainer)}>
						<div>
							<SectionCaption isWhite>歌詞から曲を好きになる<br />音楽発見サービス</SectionCaption>
						</div>
						<Sentence className={css(this.styles.pcCenter)}>歌詞にはアーティストのストーリーが込められている。<br />湧きあがる想いを込めて書いた詩も<br />無機質だけどカッコいい詩も<br />なんだっていい。<br />もっと自由に音楽を味わおう。</Sentence>
						<AppealCard />
					</div>
				</div>
				<div className={css(this.styles.sectionWrap)}>
					<div className={css(this.styles.innerContainer)}>
						<div className={css(this.styles.textCenter)}>
							<Sentence className={css(this.styles.emoi)} center>エモい歌詞、揃えてます</Sentence>
							{this.onboardButton}
						</div>
					</div>
				</div>
			</>
        )
	}

	get aboutSectionClass() {
		return [
			css(this.styles.sectionWrap),
			css(this.styles.aboutSection),
		].join(" ")
	}
	
	get lyricSentence() {
		return "「どうしようもないことで僕らは泣いたり笑ったりしている。同じ話さどいつもこいつも。俺だけがまともだって思ってる。」「愛想をつかれても諦めないよ。急に来ても良いように。掃除をしておこう  シャツも洗っておこう」「洗濯物を畳むのも面倒臭いな。闘い疲れたってほど闘っちゃないけど、あなたにもわかるでしょう？街が眠る前に。」「きったねえ世の中だけどきっかけになったもんなんて人それぞれ色々あるだろうから今この瞬間まだ何もやりてぇことが見つかってねえっつうティーンエージャー。あんたみたいな人間のために俺は生きてきたのさ。」「幾千もの星のような雲のような「どこまでも」が音を立てて崩れるさま」「あいつらが簡単にやっちまう30回のセックスよりも「グミ・チョコレート・パイン」を青春時代に1回読むってことの方が僕にとっては価値があるのさ」「この蒼くて広い世界に無数に散らばった中から、別々に二人選んだ糸をお互いたぐり寄せあったんだ。」"
	}

    get onboardButtonBlock() {
		return (
			<div className={css(this.styles.textCenter)}>
					<p className={css(this.styles.onbordCaption)}>エモい歌詞、揃えてます</p>
					{this.onboardButton}
			</div>
		)
	}

	get onboardButton() {
		if(this.props.vm.isAuthed) {
			return (
				<Button
						onClick={this.props.vm.signin}
						isSignin={false}
				>歌詞をさがす</Button>
			)
		}
		return (
			<Button
					onClick={this.props.vm.signin}
					isSignin={true}
			>Twitterで始める</Button>
		)
	}

    get styles() {
        return StyleSheet.create({
            container: {
				backgroundColor: '#e8d103 !important',
				backgroundSize: 'cover',
				minHeight: '92.5vh',
				overflow: 'hidden',
			},
			innerContainer: {
				marginRight: 'auto',
				marginLeft: 'auto',
				minWidth: 250,
				paddingTop: 20,
				paddingBottom: 20,
				position: 'relative',
				width: '87.5%',
				[MediaBreakPointUp.SM]: {
					width: '70%',
				},
			},
			innerFirstview: {
				position: 'relative',
				zIndex: 2,
				[MediaBreakPointUp.SM]: {
					margin: '0 auto',
					maxWidth: '1100px',
					width: '90',
				},
			},
			pcCenter: {
				color: '#fff !important',
				[MediaBreakPointUp.SM]: {
					textAlign: 'center',
				},
			},
			stardustBottomLeft: {
				bottom: -6,
				left: 0,
				position: 'absolute',
			},
			stardustBottomLeftImg: {
				width: 200,
			},
			stardustTopRight: {
				position: 'absolute',
				right: 0,
				top: 0,
			},
			stardustTopRightImg: {
				width: 125,
			},
			textCenter: {
				textAlign: 'center',
			},
			pageTitle: {
				color: '#20203f',
				fontSize: 22,
				fontWeight: 600,
				letterSpacing: 2,
				marginTop: 50,
				marginBottom: 8,
				textAlign: 'center',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					fontSize: 28,
				},
			},
			numberCaption: {
				fontSize: '1.5em',
				fontWeight: 600,
				color: '#20203f',
				textShadow: '1px 1px 10px #301341',
			},
			subTitle: {
				color: '#20203f',
				fontSize: 12,
				fontWeight: 600,
				letterSpacing: '1px',
				lineHeight: '1.78',
				marginTop: '0',
				marginBottom: '5px',
				[MediaBreakPointUp.SM]: {
					fontSize: '0.88em',
				},
			},
			lyricSentence: {
				color: '#4F3F3F',
				fontSize: 12,
				fontWeight: 300,
				letterSpacing: 1,
				lineHeight: 2.35,
				[MediaBreakPointUp.SM]: {
					fontSize: 25,
					fontWeight: 'bold',
					marginBottom: 25,
				},
			},
			link: {
				bottom: '20px',
				color: '#fff',
				display: 'block',
				fontSize: '0.7em',
				letterSpacing: '1px',
				marginBottom: '20px',
			},
			onbordCaption: {
				color: '#20203f',
				fontSize: 12,
				fontWeight: 500,
				letterSpacing: 1,
				marginBottom: 10,
			},
			sectionWrap: {
				backgroundColor: '#fff',
				paddingBottom: 20,
				position: 'relative',
			},
			aboutSection: {
				backgroundColor: '#3f3f5f',
				color: '#fff',
				[MediaBreakPointUp.SM]: {
					textAlign: 'center',
				},
			},
			pink: {
				color: '#e73774 !important',
			},
			textWhite: {
				color: '#fff !important',
			},
			emoi: {
				color: '#6f6f7f',
				fontWeight: 600,
			},
        })
    }

}

export class HomeVM {
	private accountService: AccountService
	private router: RouteController
	private tracker: Tracker

	@observable
	isAuthed: boolean = false

	constructor(accountService: AccountService, router: RouteController, tracker: Tracker) {
		this.accountService = accountService
		this.router = router
		this.tracker = tracker

		this.isAuthed = this.accountService.isAuthed
	}

	@bind
	signin() {
		if(this.isAuthed) {
			this.router.push('/lyrics')
			return
		}

		this.accountService.signinWithTwitter().then(account => {
			this.router.push('/lyrics')
			this.tracker.trackSignup(account)	
		})
	}

	@bind
	onClickToTL() {
		this.router.push('/lyrics')
	}

}

/*-----------------
 Child component
--------------------*/

const AppealCard = () => {
	const styles = StyleSheet.create({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
			marginTop: 35,
			padding: 0,
			[MediaBreakPointUp.SM]: {
				marginTop: 40,
			},
		},
		itemRow: {
			alignItems: 'flex-end',
			boxSizing: 'border-box',
			color: '#fff',
			display: 'flex',
			flex: '1 0 50%',
			justifyContent: 'flex-start',
			marginBottom: 15,
			[MediaBreakPointUp.SM]: {
				marginBottom: 30,
			},
			':nth-child(2n - 1)': {
				[MediaBreakPointUp.SM]: {
					justifyContent: 'flex-end',
					paddingRight: 15,
				},	
			},
			':nth-child(2n)': {
				[MediaBreakPointUp.SM]: {
					justifyContent: 'flex-start',
					paddingLeft: 15,
				},	
			},
		},
		head: {
			fontSize: '1.9em',
			fontWeight: 'bold',
			lineHeight: 1,
			marginRight: 8,
		},
		text: {
			fontSize: '0.83em',
			letterSpacing: 2,
		},
	})

	const items = () => {
		const keyVals = [
			{ head: "5", text: "秒で読める" },
			{ head: "800", text: "以上の歌詞" },
			{ head: "10", text: "ジャンル" },
			{ head: "2", text: "秒で登録" },
		]
		return keyVals.map((item, idx) => {
			return (
				<li className={css(styles.itemRow)} key={idx}>
					<span className={css(styles.head)}>{item.head}</span>
					<span className={css(styles.text)}>{item.text}</span>
				</li>
			)
		})
	}
	
	return (
		<ul className={css(styles.container)}>
			{items()}
		</ul>
	)

}