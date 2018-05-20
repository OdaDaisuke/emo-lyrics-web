import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { Button, Sentence } from '../atoms'
import { LyricService } from '../../domain'
import { LyricCardList, LyricCardListVM } from '../organisms'

export interface LyricProps {
}

export class Lyric extends React.Component<LyricProps, any> {
  render(): JSX.Element {
    return (
      <div>
        <LyricCardList vm={this.lyricCardListVM} />
      </div>
    )
  }

  get lyricCardListVM() {
    return new LyricCardListVM()
  }

}
