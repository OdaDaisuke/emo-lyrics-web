import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'
import { Button, Sentence } from '../atoms'
import { LyricService } from '../../domain'
import { LyricCard, LyricCardVM } from '../molecules'

export interface LyricProps {
}

export class Lyric extends React.Component<LyricProps, any> {
  render(): JSX.Element {
    return (
      <div>
        <LyricCard vm={this.lyricCardVM} />
      </div>
    )
  }

  get lyricCardVM() {
    return new LyricCardVM()
  }

}
