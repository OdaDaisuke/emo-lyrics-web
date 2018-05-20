import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'
import { LyricService } from '../../domain/lyric'
import { LyricProps } from '../../data'

export interface LyricCardProps {
  vm: LyricCardVM
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
  constructor(props: any) {
    super(props)
    this.props.vm.initialize()
  }
    render(): JSX.Element {
        return (
            <div>
                {this.lyricsDom}
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
        const dom = this.props.vm.lyrics.map((lyric: LyricProps) => {
            return (
                <div key={lyric.CreatedAt}>
                    {lyric.Content}
                    {lyric.Title}
                    {lyric.Url}
                </div>
            )
        })
        return (<div>{dom}</div>)
    }

}

export class LyricCardVM {
    lyricService: LyricService | null = null

    @observable
    lyrics: any = []

    @observable
    lyricIdx: number = 0

    initialize() {
        this.lyricService = new LyricService()
    }

    getLyrics() {
        if(!this.lyricService) {
            return null
        }
        this.lyricService.get(this.getLyricsCallback)
    }

    @bind
    getLyricsCallback(lyrics: LyricProps) {
        this.lyrics = lyrics
    }

}
