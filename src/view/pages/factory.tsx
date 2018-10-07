import * as React from 'react'
import { bind } from 'bind-decorator'
import { DomainFactory } from '../../domain/factory'
import {
  Home, HomeVM,
  LyricPage, LyricPageVM,
  NotFoundPage, NotFoundPageVM,
  SignoutPage, SignoutPageVM,
  FavoritesPage, FavoritesPageVM,
} from './'

export class PageFactory {
  private domainFactory: DomainFactory
  private history: any

  private lyricPageVM: LyricPageVM | null = null

  constructor(domainFactory: DomainFactory, history: any) {
    this.domainFactory = domainFactory
    this.history = history
  }

  @bind
  HomePage(): JSX.Element {
    const vm = new HomeVM(
      this.domainFactory.accountService,
      this.domainFactory.router,
      this.domainFactory.tracker
    )
    return (
      <Home vm={vm} history={this.history} />
    )
  }

  @bind
  LyricPage(): JSX.Element {
    const tmpVM = new LyricPageVM(this.domainFactory.lyricService, this.domainFactory.accountService, this.domainFactory.tracker)
    const vm = this.cachedLyricVM(tmpVM)
    return (
      <LyricPage
        vm={vm}
      	history={this.history}
      />
    )
  }

  @bind
  FavoritesPage(): JSX.Element {
    const vm = new FavoritesPageVM(this.domainFactory.lyricService)
    return (
      <FavoritesPage vm={vm} />
    )
  }

  @bind
  SignoutPage(): JSX.Element {
    const vm = new SignoutPageVM(this.domainFactory.accountService, this.domainFactory.router)
    return (
      <SignoutPage vm={vm} />
    )
  }

  @bind
  NotFoundPage(): JSX.Element {
    const vm = new NotFoundPageVM(this.domainFactory.lyricService)
    return (
      <NotFoundPage vm={vm} />
    )
  }

  private cachedLyricVM(vm: LyricPageVM) {
    if(this.lyricPageVM) {
      return this.lyricPageVM
    }
    this.lyricPageVM = vm
    return this.lyricPageVM
  }
}
