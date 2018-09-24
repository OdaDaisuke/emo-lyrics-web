import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { NotFoundCard, NotFoundCardVM } from '../organisms'
import { LyricService } from '../../domain'

export interface INotFoundProps {
  lyricService: LyricService
}

export class NotFound extends React.Component<INotFoundProps, any> {
  private lyricService: LyricService

  constructor(props: INotFoundProps) {
    super(props)
    this.lyricService = props.lyricService
  }

  render():JSX.Element {
    return (
      <div>
        <NotFoundCard
          lyricService={this.lyricService}
          vm={new NotFoundCardVM()}
        />
      </div>
    )
  }

}
