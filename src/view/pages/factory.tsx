import * as React from 'react'
import { bind } from 'bind-decorator'
import { DomainFactory } from '../../domain/factory'
import { AccountService, LyricService } from '../../domain'
import {
  Home,
  Lyric, LyricPageVM,
  NotFound, Thanks
} from './'
import { Stores } from '../../stores/factory'

export class PageFactory {
  private domainFactory: DomainFactory
  private history: any
  private stores: Stores

  constructor(domainFactory: DomainFactory, history: any, stores: Stores) {
    this.domainFactory = domainFactory
    this.history = history
    this.stores = stores
  }

  @bind
  HomePage(): JSX.Element {
    return (
      <Home
      	accountService={this.domainFactory.accountService}
      />
    )
  }

  @bind
  LyricPage(): JSX.Element {
    const vm = new LyricPageVM(this.domainFactory.lyricService)
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

}
