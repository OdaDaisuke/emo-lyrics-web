import * as React from 'react'
import { bind } from 'bind-decorator'
import { DomainFactory } from '../../domain/factory'
import {
  Home, HomeVM,
  Lyric, LyricPageVM,
  NotFound, Thanks
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
    const vm = new HomeVM(this.domainFactory.accountService, this.domainFactory.router)
    return (
      <Home vm={vm} history={this.history} />
    )
  }

  @bind
  LyricPage(): JSX.Element {
    const tmpVM = new LyricPageVM(this.domainFactory.lyricService)
    const vm = this.cachedLyricVM(tmpVM)
    return (
      <Lyric
        vm={vm}
      	history={this.history}
      />
    )
  }

  @bind
  ThanksPage(): JSX.Element {
    return (
      <Thanks />
    )
  }

  @bind
  NotFoundPage(): JSX.Element {
    return (
      <NotFound
      	lyricService={this.domainFactory.lyricService}
      />
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
