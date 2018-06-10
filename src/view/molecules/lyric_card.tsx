import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { LyricService } from '../../domain/lyric'
import { LyricProps } from '../../data'
import { Button } from '../atoms'

export interface LyricCardProps {
  title: string
  content: string
  singer: string
  url: string
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
    render(): JSX.Element {
        return (
            <div className={css(this.style.wrapper)}>
	      <div className={css(this.style.inner)}>
		<p className={css(this.style.content)}>
		  {this.props.content}
		</p>
		  <span className={css(this.style.title)}>「{this.props.title}」</span>
		  <span className={css(this.style.singer)}>{this.props.singer}</span>
		  <div>
		    <a className={css(this.style.url)} href={this.props.url} target="_blank">
		      > この曲を聴いてみる
		    </a>
		    <a href={this.tweetLink} target="_blank">
	  	      <Button type="tweet">tweet</Button>
	  	    </a>
		  </div>
	      </div>
            </div>
        )
    }

  get tweetLink() {
    let content = this.props.content.substr(0, 80)
    if(this.props.content.length > 80) {
      content += "..."
    }
    return `https://twitter.com/intent/tweet?url=${configs.env.siteUrl}&text=「${content}」&hashtags=エモ詩&via=hinodeya_pon`
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
	alignItems: 'center',
	display: 'flex',
	height: '100%',
	width: '100%',
      },
      inner: {
	marginRight: 'auto',
	marginLeft: 'auto',
	maxWidth: '800px',
	textAlign: "center",
	width: '80%',
	[configs.breakpoints.sm]: {
	  width: '85%',
	},
      },
      content: {
	color: '#3f3456',
	fontFamily: 'YuGothic',
	fontSize: '2rem',
	fontWeight: 'normal',
	letterSpacing: '2px',
	lineHeight: '1.82',
	marginTop: '0',
	[configs.breakpoints.sm]: {
	  fontSize: '1.12rem',
	},
      },
      title: {
	color: '#70707f',
	fontStyle: 'italic',
	marginRight: '1rem',
	letterSpacing: '1px',
	[configs.breakpoints.sm]: {
	  display: 'block',
	  fontSize: '0.8rem',
	  marginBottom: '2px',
	  width: '100%',
	},
      },
      singer: {
	color: '#70707f',
	fontSize: '0.95rem',
	letterSpacing: '1px',
	[configs.breakpoints.sm]: {
	  fontSize: '0.8rem',
	},
      },
      url: {
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: '#24a8b9',
	color: "#24a8b9",
	borderRadius: "30px",
	display: "inline-block",
	fontSize: "0.85rem",
	fontWeight: 'lighter',
	marginTop: "20px",
	marginRight: "auto",
	marginLeft: "auto",
	textDecoration: "none",
	letterSpacing: "1px",
	fontStyle: "italic",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: '9px',
	paddingRight: '18px',
	paddingBottom: '9px',
	paddingLeft: '18px',
	transition: 'all 0.2s',
	':hover': {
	  backgroundColor: '#24a8b9',
	  color: '#fff',
	  transform: 'scale(1.05)',
	},
      },
    })
  }

}

