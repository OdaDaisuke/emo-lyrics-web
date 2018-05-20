import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LyricService } from '../../domain/lyric'

export interface LyricCardProps {
  vm: LyricCardVM
}

export class LyricCard extends React.Component<LyricCardProps, any> {
  constructor(props: any) {
    super(props)
    this.props.vm.initialize()
  }
    render(): JSX.Element {
        return (
            <div>
                <p>{this.lyricsDom}</p>
            </div>
        )
    }

    /*------ Lifecycles ------*/
    componentDidMount() {
        this.props.vm.getLyrics()
    }

    /*------ ChildComponents ------*/
    get lyricsDom() {
        if(!this.props.vm.lyrics) {
            return null
        }
        const dom = this.props.vm.lyrics.map((lyric: any) => {
            return (
                <div>
                    lyric
                </div>
            )
        })
        return (<div>{dom}</div>)
    }

}

export class LyricCardVM {
    lyricService: LyricService | null = null
    lyrics: any = []

  initialize() {
    this.lyricService = new LyricService()
  }

    getLyrics() {
      if(!this.lyricService) {
	return null
      }
        this.lyricService.get(this.getLyricsCallback)
    }

    getLyricsCallback(data: any) {
        this.lyrics = data
    }

}
