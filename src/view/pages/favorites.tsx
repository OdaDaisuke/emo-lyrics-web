import * as React from 'react'
import { observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { LyricService } from '../../domain'

export interface IFavoritesPageProps {
  vm: FavoritesPageVM
}

@observer
export class FavoritesPage extends React.Component<IFavoritesPageProps, any> {
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

export class FavoritesPageVM {
  private lyricService: LyricService

  constructor(lyricService: LyricService) {
    this.lyricService = lyricService
  }

}
