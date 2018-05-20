import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import { bind } from 'bind-decorator'
import * as configs from '../../configs'
import { LyricService } from '../../domain/lyric'
import { Button } from '../atoms'

export interface AdminProps {
}

export class Admin extends React.Component<AdminProps, any> {
  private lyricService: LyricService | null = null

  constructor(props: any) {
        super(props)
        this.state = {
            title: "",
            singer: "",
            content: "",
            url: "",
        }
    this.lyricService = new LyricService()
  }

    render(): JSX.Element {
        return (
            <div>
                <p>
                    <span>タイトル</span>
                    <input type="text" onChange={this.changeTitle} value={this.state.title} />
                </p>
                <p>
                    <span>歌手</span>
                    <input type="text" onChange={this.changeSinger} />
                </p>
                <p>
                    <span>歌詞</span>
                    <textarea onChange={this.changeContent}></textarea>
                </p>
                <p>
                    <span>url</span>
                    <input type="text" onChange={this.changeUrl} />
                </p>
                <Button onClick={this.onSubmit} label="作成" />
            </div>
        )
    }

    createCallback(data: any) {
        console.log(data)
    }

    /*------ Handlers ------*/
    @bind
    changeTitle(e: any) {
        this.setState({ title: e.target.value })
    }

    @bind
    changeSinger(e: any) {
        this.setState({ singer: e.target.value })
    }

    @bind
    changeContent(e: any) {
        this.setState({ content: e.target.value })
    }

    @bind
    changeUrl(e: any) {
        this.setState({ url: e.target.value })
    }

    @bind
    onSubmit() {
      if(!this.lyricService) {
	return null
      }
        const params = {
            title: this.state.title,
            singer: this.state.singer,
            content: this.state.content,
            url: this.state.url,
        }
        this.lyricService.create(params, this.createCallback)
    }
}
