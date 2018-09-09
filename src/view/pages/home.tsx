import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { LoginButton, LoginButtonVM } from '../molecules'
import { Link } from 'react-router-dom'
import { Sentence, Button } from '../atoms'
import { AccountService } from '../../domain'

interface IHomeProps {
  accountService: AccountService
  history: any
}

export class Home extends React.Component<any, any> {
    private accountService: AccountService

    constructor(props: any) {
      super(props)
      this.accountService = props.accountService
    }

    render(): JSX.Element {
        return (
            <div>
                <div className={css(this.style.firstview)}>
                    <div className={css(this.style.container)}>
						<a href={`${configs.env.tweetBaseUri}?url=${configs.env.siteUrl}&text=【エモリリック】歌詞から曲を好きになる&hashtags=エモ詩`}
							target="_blank"
						>
							<Button type="tweet" fill={true}>tweet</Button>
						</a>
					</div>
					<Link to="/lyric">
						<Button>歌詞をさがす</Button>
					</Link>
                </div>
            </div>
        )
    }

    get loginButton() {
		if(this.accountService.loadAccount()) {
			return null
		}
		return (
			<LoginButton
				history={this.props.history}
				vm={new LoginButtonVM(this.accountService)}
			/>
		)
	}

    get innerStyle() {
        return [css(this.style.textCenter), css(this.style.containerPaddingY)].join(' ')
    }

    get style() {
        return StyleSheet.create({
            container: configs.styles.container,
            containerPaddingY: configs.styles.containerPaddingY,
            containerPaddingYs: configs.styles.containerPaddingYs,
            textCenter: {
        	    textAlign: 'center',
            },
			sentenceWrap: {
				borderColor: '#fff',
				borderStyle: 'solid',
				borderTopWidth: '1px',
				borderRightWidth: '0',
				borderBottomWidth: '1px',
				borderLeftWidth: '0',
				marginRight: 'auto',
				marginBottom: '25px',
				marginLeft: 'auto',
				maxWidth: '450px',
				minWidth: '250px',
				paddingTop: '10px',
				paddingRight: '20px',
				paddingBottom: '10px',
				paddingLeft: '20px',
				width: '65%',
			},
            firstview: {
            	backgroundSize: 'cover',
            	backgroundColor: '#fff',
            	backgroundPosition: 'center',
            	color: '#ffffff',
                position: 'relative',
                height: '100vh',
            },
            fvTitle: {
				color: '#fff',
            	display: 'inline-block',
            	fontWeight: 600,
            	letterSpacing: '3px',
            	fontSize: '2rem',
                marginBottom: '5px',
				paddingTop: '0.75rem',
				paddingRight: '1.5rem',
            	paddingBottom: '0.75rem',
				paddingLeft: '1.5rem',
				[configs.breakpoints.sm]: {
					fontSize: '1.1rem',
					marginTop: '0',
				},
            },
            sectionTitle: {
        	    fontWeight: 200,
        	    letterSpacing: '2px',
            },
        })
    }

}
