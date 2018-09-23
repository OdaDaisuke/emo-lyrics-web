import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { LoginButton, LoginButtonVM } from '../molecules'
import { Link } from 'react-router-dom'
import { Button } from '../atoms'
import { LyricPreviewList } from '../organisms'
import { FullWidthLayout } from '../layouts'
import { AccountService } from '../../domain'
import { MediaBreakPointUp } from '../styles'

interface IHomeProps {
	vm: HomeVM
	history: any
}

export class Home extends React.Component<IHomeProps, any> {
    render(): JSX.Element {
        return (
			<FullWidthLayout className={css(this.styles.container)}>
				<div className={css(this.styles.innerContainer)}>
					<h2 className={css(this.styles.pageTitle)}>歌詞から曲を好きになる</h2>
					<p className={css(this.styles.subTitle)}>1000曲以上のエモい歌詞揃えてます。<br />邦楽・洋楽・POPから演歌まで。</p>
					<Link to="/lyric">
						<Button>歌詞をさがす</Button>
					</Link>
					<LyricPreviewList />
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
				vm={new LoginButtonVM(this.props.vm.accountService)}
			/>
		)
	}

    get styles() {
        return StyleSheet.create({
            container: {
				backgroundImage: 'linear-gradient(#0cad79, #0cad79, #0cad79)',
				height: '92.5vh',
				overflow: 'hidden',
			},
			innerContainer: Object.assign({}, configs.styles.container, {
				height: '100%',
				textAlign: 'center',
			}),
			pageTitle: {
				color: '#fff',
				fontSize: '1.5rem',
				fontWeight: 'bold',
				letterSpacing: '1px',
				marginTop: '17.5vh',
				marginBottom: '0.5rem',
				textAlign: 'center',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					fontSize: '2rem',
					marginTop: '18vh',
				},
			},
			subTitle: {
				color: '#fff',
				fontSize: '0.85em',
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
				position: 'absolute',
				right: '5%',
			},
        })
    }

}

export class HomeVM {
	accountService: AccountService

	constructor(accountService: AccountService) {
		this.accountService = accountService
	}
}