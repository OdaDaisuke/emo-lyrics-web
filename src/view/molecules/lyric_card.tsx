import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain/lyric'
import { LyricProps } from '../../data'

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
		      >
		    </a>
		  </div>
	      </div>
            </div>
        )
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
      },
      content: {
	color: '#3f3456',
	fontFamily: 'YuGothic',
	fontSize: '1.38rem',
	letterSpacing: '2px',
	lineHeight: '1.82',
      },
      title: {
	color: '#4f4f5f',
	fontStyle: 'italic',
	marginRight: '1rem',
	letterSpacing: '1px',
      },
      singer: {
	color: '#4f4f5f',
	fontSize: '0.95rem',
	letterSpacing: '1px',
      },
      url: {
	color: "#24a8b9",
	borderRadius: "2px",
	display: "flex",
	fontSize: "0.85rem",
	marginTop: "10px",
	marginRight: "auto",
	marginLeft: "auto",
	textDecoration: "none",
	letterSpacing: "1px",
	fontStyle: "italic",
	alignItems: "center",
	fontWeight: "bold",
	justifyContent: "center",
      },
    })
  }

}

