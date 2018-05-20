import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'
import * as configs from '../../configs'
import { Button, Sentence } from '../atoms'

export interface HomeProps {
}

export class Home extends React.Component<HomeProps, any> {
    render(): JSX.Element {
        return (
            <div>
                <div className={css(this.style.firstview)}>
                    <div className={css(this.style.container)}>
                        <div className={this.innerStyle}>
                            <h2 className={css(this.style.fvTitle)}>歌詞から曲を、好きになる</h2>
                            <Sentence label="あなたが青春時代に口ずさんだ曲は何ですか？" />
                            <Sentence label="想い出のアーティストは、誰ですか？" />
                            <Sentence label="もしかしたら、いま世界は商業音楽で溢れているかもしれないけど" />
                            <Sentence label="本当は違うかもしれない" />
                            <Sentence label="詩には本物の想いが込められているかもしれない。" />
                           <Link to="/lyric">
			    <Button label="Twitterログイン" />
			  </Link>
                        </div>
                    </div>
                </div>
            </div>
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
            firstview: {
            	backgroundImage: "url('./assets/images/guitar.jpg')",
            	backgroundSize: 'cover',
            	backgroundColor: 'rgba(32, 36, 6, 0.85)',
            	backgroundBlendMode: 'overlay',
            	backgroundPosition: 'center',
            	color: '#ffffff',
                position: 'relative',
                height: '100vh',
            },
            fvTitle: {
            	display: 'inline-block',
            	fontWeight: 600,
            	letterSpacing: '3px',
            	fontSize: '2rem',
            	borderBottom: '1px solid #fff',
                marginTop: '60px',
                marginBottom: '15px',
            	paddingBottom: '0.75rem',
            	transform: 'skew(-10deg)',
            },
            sectionTitle: {
        	    fontWeight: 200,
        	    letterSpacing: '2px',
            },
        })
    }

}
