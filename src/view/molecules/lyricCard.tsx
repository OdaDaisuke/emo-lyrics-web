import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { bind } from 'bind-decorator'
import { computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import { LyricService } from '../../domain/lyric'

export interface LyricCardProps {
  vm: LyricCardVM
}

@observer
export class LyricCard extends React.Component<LyricCardProps, any> {
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
        const dom = this.props.vm.lyrics.map((lyric: any) => {
            console.log(lyric)
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

    @observable
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

    private getLyricsCallback(lyrics: any) {
        this.lyrics = lyrics
    }

}
