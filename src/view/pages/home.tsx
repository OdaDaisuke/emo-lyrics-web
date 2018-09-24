import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { LoginButton } from '../molecules'
import { bind } from 'bind-decorator'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Button } from '../atoms'
import { LyricPreviewList } from '../organisms'
import { FullWidthLayout } from '../layouts'
import { AccountService, Tracker } from '../../domain'
import { MediaBreakPointUp } from '../styles'
import { utils } from '../styles'
import { RouteController } from '../../route/controller'

interface IHomeProps {
	vm: HomeVM
	history: any
}

@observer
export class Home extends React.Component<IHomeProps, any> {
    render(): JSX.Element {
	
        return (
			<FullWidthLayout className={css(this.styles.container)}>
				<div className={css(this.styles.innerContainer)}>
					<h2 className={css(this.styles.pageTitle)}>歌詞から曲を好きになる</h2>
					<p className={css(this.styles.subTitle)}>1000曲以上のエモい歌詞揃えてます。<br />邦楽・洋楽・POPから演歌まで。</p>
					<Button onClick={this.props.vm.signin}>歌詞をさがす</Button>
					<LyricPreviewList
						onClickSignin={this.props.vm.signin}
						isAuthed={this.props.vm.isAuthed}
						onClickToTL={this.props.vm.onClickToTL}
					/>
					<a
						href="https://twitter.com/hinodeya_pon"
						target="_blank"
						className={css(this.styles.link)}
					>運営元</a>
				</div>
			</FullWidthLayout>
        )
    }

    get loginButton() {
		if(this.props.vm.accountService.loadAccount()) {
			return null
		}
		return (
			<LoginButton
				history={this.props.history}
			/>
		)
	}

    get styles() {
        return StyleSheet.create({
            container: {
				backgroundImage: 'linear-gradient(rgb(12, 173, 121) 10%, rgb(13, 152, 107), rgb(12, 119, 85))',
				minHeight: '95vh',
				overflow: 'hidden',
			},
			innerContainer: Object.assign({}, utils.container, {
				height: '100%',
				textAlign: 'center',
			}),
			pageTitle: {
				color: '#fff',
				fontSize: '1.5rem',
				fontWeight: 200,
				letterSpacing: '1px',
				marginTop: '10vh',
				marginBottom: '0.5rem',
				textAlign: 'center',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					fontSize: '2.5rem',
					marginTop: '10vh',
				},
			},
			subTitle: {
				color: '#fff',
				fontSize: '0.85em',
				fontWeight: 200,
				letterSpacing: '1px',
				lineHeight: '1.78',
				marginTop: '0',
				marginBottom: '5px',
			},
			link: {
				bottom: '20px',
				color: '#fff',
				display: 'block',
				fontSize: '0.7em',
				letterSpacing: '1px',
				marginBottom: '20px',
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