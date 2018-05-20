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
            <div>
	      <p className={css(this.style.content)}>
                {this.props.content}
	      </p>
		{this.props.title}
		{this.props.singer}
		<a href={this.props.url} target="_blank">
		  {this.props.url}
		</a>
            </div>
        )
    }

  get style() {
    return StyleSheet.create({
      content: {
	fontSize: '1.25rem',
	letterSpacing: '2px',
	lineHeight: '1.75',
      },
    })
  }

}

