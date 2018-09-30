import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { LoginButton } from '../molecules'
import { bind } from 'bind-decorator'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Button, SectionCaption } from '../atoms'
import { LyricPreviewList } from '../organisms'
import { FullWidthLayout } from '../layouts'
import { AccountService, Tracker } from '../../domain'
import { MediaBreakPointUp } from '../styles'
import { utils } from '../styles'
import { RouteController } from '../../route/controller'
import { FaTshirt } from 'react-icons/fa';

interface IHomeProps {
	vm: HomeVM
	history: any
}

@observer
export class Home extends React.Component<IHomeProps, any> {
    render(): JSX.Element {

        return (
			<div>
				<FullWidthLayout
					className={css(this.styles.container)}
					transparentHeader={true}
					isAuthed={this.props.vm.isAuthed}
				>
					<div className={css(this.styles.innerContainer)}>
						<h2 className={css(this.styles.pageTitle)}>5秒で曲を好きになる</h2>
						<p className={css(this.styles.subTitle)}>サクッと読めるエモい歌詞、揃えてます。<br />歌詞から曲を好きになる。</p>
					</div>
					<LyricPreviewList
						onClickSignin={this.props.vm.signin}
						isAuthed={this.props.vm.isAuthed}
						onClickToTL={this.props.vm.onClickToTL}
					/>
					{this.onboardButtonBlock}
				</FullWidthLayout>
				<div className={css(this.styles.sectionWrap)}>
					<div className={css(this.styles.textCenter)}>
						<SectionCaption>詞はストーリーだ</SectionCaption>
					</div>
					<p className={css(this.styles.lyricSentence)}>{this.lyricSentence}</p>
					<div className={css(this.styles.textCenter)}>
						{this.onboardButton}
					</div>
				</div>
			</div>
        )
	}
	
	get lyricSentence() {
		return "「どうしようもないことで僕らは泣いたり笑ったりしている。同じ話さどいつもこいつも。俺だけがまともだって思ってる。」「愛想をつかれても諦めないよ。急に来ても良いように。掃除をしておこう  シャツも洗っておこう」「洗濯物を畳むのも面倒臭いな。闘い疲れたってほど闘っちゃないけど、あなたにもわかるでしょう？街が眠る前に。」「きったねえ世の中だけどきっかけになったもんなんて人それぞれ色々あるだろうから今この瞬間まだ何もやりてぇことが見つかってねえっつうティーンエージャー。あんたみたいな人間のために俺は生きてきたのさ。」「幾千もの星のような雲のような「どこまでも」が音を立てて崩れるさま」「あいつらが簡単にやっちまう30回のセックスよりも「グミ・チョコレート・パイン」を青春時代に1回読むってことの方が僕にとっては価値があるのさ」「この蒼くて広い世界に無数に散らばった中から、別々に二人選んだ糸をお互いたぐり寄せあったんだ。」"
	}

    get onboardButtonBlock() {
		if(this.props.vm.isAuthed) {
			return (
				<div className={css(this.styles.textCenter)}>
					{this.onboardButton}
				</div>
			)
		}
		return (
			<div className={css(this.styles.textCenter)}>
					<p className={css(this.styles.onbordCaption)}>ログインして歌詞に浸ろう</p>
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
			>Twitterログイン</Button>
		)
	}

    get styles() {
        return StyleSheet.create({
            container: {
				backgroundBlendMode: 'overlay',
				backgroundColor: 'rgba(50, 34, 6, 0.76)',
				backgroundImage: 'url("./assets/images/live.jpg")',
				minHeight: '95vh',
				overflow: 'hidden',
			},
			innerContainer: {
				textAlign: 'center',
			},
			textCenter: {
				textAlign: 'center',
			},
			pageTitle: {
				color: '#fff',
				fontSize: 26,
				fontWeight: 500,
				letterSpacing: 2,
				marginTop: 70,
				marginBottom: 20,
				textAlign: 'center',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					fontSize: '2.5rem',
				},
			},
			subTitle: {
				color: '#fff',
				fontSize: 12,
				fontWeight: 400,
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
				fontWeight: 500,
				letterSpacing: 1,
				lineHeight: 2,
				marginRight: 20,
				marginLeft: 25,
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
				color: '#fff',
				fontSize: 12,
				fontWeight: 500,
				letterSpacing: 1,
				marginBottom: 0,
			},
			sectionWrap: {
				paddingBottom: 20,
			},
        })
    }

}

export class HomeVM {
	accountService: AccountService
	router: RouteController
	tracker: Tracker

	@observable
	isAuthed: boolean = false

	constructor(accountService: AccountService, router: RouteController, tracker: Tracker) {
		this.accountService = accountService
		this.router = router
		this.tracker = tracker

		this.init()
	}

	async init() {
		this.isAuthed = this.accountService.isAuthed
	}

	@bind
	async signin() {
		if(this.isAuthed) {
			this.router.push('/lyric')
			return
		}

		const callback = (result: any) => {
			this.router.push('/lyric')
			this.tracker.trackSignup(result)
		}
		await this.accountService.signinWithTwitter(callback)
	}

	@bind
	onClickToTL() {
		this.router.push('/lyric')
	}

}