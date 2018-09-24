import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain'

export interface IMePageProps {
  vm: MePageVM
}

@observer
export class MePage extends React.Component<IMePageProps, any> {
  render():JSX.Element {
    return (
      <div className={css(this.styles.container)}>
          アカウントページ
      </div>
    )
  }

  get styles() {
    return StyleSheet.create({
      container: {
        height: '90vh',
        textAlign: 'center',
      },
    })
  }

}

export class MePageVM {
  private lyricService: LyricService

  constructor(lyricService: LyricService) {
    this.lyricService = lyricService
  }

}
