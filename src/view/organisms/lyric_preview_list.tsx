import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { LyricPreviewCard } from '../molecules'
import { MediaBreakPointUp } from '../styles'

interface ILyricPreviewListProps {
    onClickSignin: () => void
    isAuthed: boolean
    onClickToTL: () => void
}

export class LyricPreviewList extends React.Component<ILyricPreviewListProps, any> {
    render() {
        return (
            <ul className={css(this.styles.container)}>
                <LyricPreviewCard lyric={this.firstLyric.lyric} artist={this.firstLyric.artist} title={this.firstLyric.title} />
                <LyricPreviewCard lyric={this.secondLyric.lyric} artist={this.secondLyric.artist} title={this.secondLyric.title} />
                <LyricPreviewCard
                    onClickSignin={this.props.onClickSignin}
                    isRistrict={true}
                    isAuthed={this.props.isAuthed}
                    onClickToTL={this.props.onClickToTL}
                />
            </ul>
        )
    }

    firstLyric = {
        lyric: "幸せとは星が降る夜と眩しい朝が繰り返すようなものじゃなく大切な人に降りかかった雨に傘を差せる事だ",
        artist: "back number",
        title: "瞬き",
    }
    secondLyric = {
        lyric: "同僚に笑われても、デスクの上の写真立てに飾った家族が自慢なんだ",
        artist: "セットラウンドリー",
        title: "遅くなるから",
    }

    get styles() {
        return StyleSheet.create({
            container: {
                display: 'flex',
                flexWrap: 'nowrap',
                listStyle: 'none',
                marginTop: '2em',
                marginRight: 10,
                marginBottom: 40,
                overflowX: 'scroll',
                padding: 0,
                position: 'relative',
                [MediaBreakPointUp.SM]: {
                    display: 'flex',
                },
            },
        })
    }

}