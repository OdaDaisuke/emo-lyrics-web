import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { LoginButton, LoginButtonVM } from '../molecules'
import { Link } from 'react-router-dom'
import { Sentence, Button } from '../atoms'
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
					<p className={css(this.styles.subTitle)}>邦楽・洋楽・ヒット曲から歌謡曲まで、1000曲以上の心揺さぶる歌詞揃えてます</p>
					<Link to="/lyric">
						<Button>歌詞をさがす</Button>
					</Link>
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
				backgroundColor: '#fafafa',
				height: '92.5vh',
				overflow: 'hidden',
			},
			innerContainer: Object.assign({}, configs.styles.container, {
				height: '100%',
				textAlign: 'center',
			}),
			pageTitle: {
				color: '#474747',
				fontSize: '1.25rem',
				marginTop: '18vh',
				marginBottom: '1rem',
				textAlign: 'center',
				width: '100%',
				[MediaBreakPointUp.SM]: {
					fontSize: '2rem',
				},
			},
			subTitle: {
				color: '#5f5f5f',
				fontSize: '0.85em',
				letterSpacing: '2px',
				lineHeight: '1.78',
				marginBottom: '5vh',
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