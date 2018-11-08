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
                <LyricPreviewCard lyric={this.firstLyric} />
                <LyricPreviewCard lyric={this.secondLyric} />
                <LyricPreviewCard
                    onClickSignin={this.props.onClickSignin}
                    isRistrict={true}
                    isAuthed={this.props.isAuthed}
                    onClickToTL={this.props.onClickToTL}
                />
            </ul>
        )
    }

    firstLyric = "同僚に笑われても、デスクの上の写真立てに飾った家族が自慢なんだ"
    secondLyric = "幸せとは星が降る夜と眩しい朝が繰り返すようなものじゃなく大切な人に降りかかった雨に傘を差せる事だ"

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