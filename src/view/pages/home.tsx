import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'
import * as configs from '../../configs'
import { LoginButton, LoginButtonVM } from '../molecules'
import { withRouter } from 'react-router-dom'
import { Sentence, Button } from '../atoms'
import { AccountService } from '../../domain'

export interface HomeProps {
}

class Home extends React.Component<any, any> {
    private accountService: AccountService = new AccountService()

    render(): JSX.Element {
        return (
            <div>
                <div className={css(this.style.firstview)}>
                    <div className={css(this.style.container)}>
                        <div className={this.innerStyle}>
                            <h2 className={css(this.style.fvTitle)}>歌詞から曲を、好きになる</h2>
			    <div className={css(this.style.sentenceWrap)}>
			      <Sentence label="あなたが青春時代に口ずさんだ曲は何ですか？想い出のアーティストは、誰ですか？もしかしたら、いま世界は商業音楽で溢れているかもしれないけど、本当は違うかもしれない。だから歌詞から曲を好きになるのもありかもしれないですよ。" />
			    </div>
			    <div>
			      <a href="https://twitter.com/intent/tweet?url=https://aa.com&text=【エモリリック】歌詞から曲を好きになる&hashtags=エモ詩"
				target="_blank"
			      >
				<Button type="tweet" label="つぶやく" />
			      </a>
			    </div>
			    {this.loginButton}
			    {this.towardButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    get loginButton() {
      if(this.accountService.loadAccount()) {
	return null
      }
      return (
	<LoginButton history={this.props.history} vm={new LoginButtonVM()} />
      )
    }

    get towardButton() {
      if(!this.accountService.loadAccount()) {
	return null
      }
      return (
	<Link to="/lyric">
	  <Button label="歌詞をめくる" />
	</Link>
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
	      borderRadius: '5px',
	      borderStyle: 'solid',
	      borderWidth: '1px',
	      marginRight: 'auto',
	      marginBottom: '10px',
	      marginLeft: 'auto',
	      maxWidth: '450px',
	      minWidth: '250px',
	      paddingRight: '20px',
	      paddingLeft: '20px',
	      width: '65%',
	    },
            firstview: {
            	backgroundImage: "url('./assets/images/guitar.jpg')",
            	backgroundSize: 'cover',
            	backgroundColor: 'rgba(0, 0, 0, 0.78)',
            	backgroundBlendMode: 'overlay',
            	backgroundPosition: 'center',
            	color: '#ffffff',
                position: 'relative',
                height: '100vh',
            },
            fvTitle: {
		backgroundColor: '#fff',
		color: '#333',
            	display: 'inline-block',
            	fontWeight: 600,
            	letterSpacing: '3px',
            	fontSize: '2rem',
		borderTop: '1px solid #fff',
		borderRight: '1px solid #fff',
            	borderBottom: '1px solid #fff',
		borderLeft: '1px solid #fff',
                marginTop: '60px',
                marginBottom: '15px',
		paddingTop: '0.75rem',
		paddingRight: '1.5rem',
            	paddingBottom: '0.75rem',
		paddingLeft: '1.5rem',
            	transform: 'skew(-10deg)',
            },
            sectionTitle: {
        	    fontWeight: 200,
        	    letterSpacing: '2px',
            },
        })
    }

}

export default withRouter(Home)
