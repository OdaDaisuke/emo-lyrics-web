import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import { bind } from 'bind-decorator'
import { withRouter } from 'react-router-dom'
import * as configs from '../../configs'
import { Button, Sentence } from '../atoms'
import { LyricService } from '../../domain'
import { ThanksAlert } from '../molecules'
import { LyricCardList, LyricCardListVM } from '../organisms'

export interface ILyric {
  history: any
}

class Lyric extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <div className={css(this.style.wrapper)}>
        <LyricCardList onLast={this.onLast} vm={this.lyricCardListVM} />
      </div>
    )
  }

  @bind
  onLast() {
    this.props.history.push('/thanks')
  }

  get lyricCardListVM() {
    return new LyricCardListVM()
  }

  get style() {
    return StyleSheet.create({
      wrapper: {
	position: 'relative',
      },
    })
  }

}

export default withRouter(Lyric)
