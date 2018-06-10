import * as React from 'react'
import { bind } from 'bind-decorator'
import { DomainFactory } from '../../domain/factory'
import { AccountService, LyricService } from '../../domain'
import { Home, Lyric, NotFound, Thanks } from './'

export class PageFactory {
  private domainFactory: DomainFactory
  private history: any

  constructor(domainFactory: DomainFactory, history: any) {
    this.domainFactory = domainFactory
    this.history = history
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
    return (
      <Lyric
	lyricService={this.domainFactory.lyricService}
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
