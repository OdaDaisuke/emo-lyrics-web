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
		  <a href={this.props.url} target="_blank">
		    {this.props.url}
		  </a>
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
	width: '80%',
      },
      content: {
	color: '#92862c',
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
    })
  }

}

