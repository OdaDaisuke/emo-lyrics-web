import * as React from 'react'
import { bind } from 'bind-decorator'
import { DomainFactory } from '../../domain/factory'
import {
  Home, HomeVM,
  LyricsPage, LyricsPageVM,
  LyricPage, LyricPageVM,
  NotFoundPage, NotFoundPageVM,
  SignoutPage, SignoutPageVM,
  FavoritesPage, FavoritesPageVM,
} from './'
import { Memoize } from '../../utils'

export class PageFactory {
  private domainFactory: DomainFactory
  private history: any

  constructor(domainFactory: DomainFactory, history: any) {
    this.domainFactory = domainFactory
    this.history = history
  }

  @bind
  HomePage(): JSX.Element {
    const vm = new HomeVM(
      this.domainFactory.accountService,
      this.domainFactory.router,
      this.domainFactory.tracker,
    )
    return (
      <Home vm={vm} history={this.history} />
    )
  }

  @bind
  LyricsPage(): JSX.Element {
    const vm = this.LyricsPageVM()
    return (<LyricsPage vm={vm} history={this.history} />)
  }

  @bind
  LyricPage(props: any): JSX.Element {
    const vm = this.LyricPageVM(props.match.params.id)
    return (<LyricPage vm={vm} history={this.history} />)
  }

  @bind
  FavoritesPage(): JSX.Element {
    const vm = this.FavoritesPageVM()
    return (<FavoritesPage vm={vm} />)
  }

  @bind
  SignoutPage(): JSX.Element {
    const vm = this.SignoutPageVM()
    return (<SignoutPage vm={vm} />)
  }

  @bind
  NotFoundPage(): JSX.Element {
    const vm = this.NotFoundPageVM()
    return (<NotFoundPage vm={vm} />)
  }

  /*------ ViewModels ------*/

  @Memoize
  private LyricsPageVM() {
    return new LyricsPageVM(
      this.domainFactory.lyricService,
      this.domainFactory.accountService,
      this.domainFactory.tracker,
      this.domainFactory.router
    )
  }

  @Memoize
  private LyricPageVM(lyricId: number) {
    return new LyricPageVM(
      this.domainFactory.lyricService,
      this.domainFactory.accountService,
      this.domainFactory.tracker,
      this.domainFactory.router,
      lyricId,
    )
  }

  @Memoize
  private FavoritesPageVM() {
    return new FavoritesPageVM(
      this.domainFactory.accountService,
      this.domainFactory.lyricService,
      this.domainFactory.tracker,
      this.domainFactory.router,
    )
  }

  @Memoize
  private NotFoundPageVM() {
    return new NotFoundPageVM(this.domainFactory.lyricService)
  }

  @Memoize
  private SignoutPageVM() {
    return new SignoutPageVM(this.domainFactory.accountService, this.domainFactory.router)
  }

}
