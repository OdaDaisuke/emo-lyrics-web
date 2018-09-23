import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Button } from '../atoms'

interface ILyricPreviewCardProps {
    isRistrict?: boolean
}

export class LyricPreviewCard extends React.Component<ILyricPreviewCardProps, any> {
    render() {
        return (
            <div className={this.containerStyle}>
                {this.innerContent}
            </div>
        )
    }

    get innerContent() {
        if(this.props.isRistrict) {
            return (
                <React.Fragment>
                    <span className={css(this.styles.restrictLabel)}>続きを見るには</span>
                    <Button>ログイン</Button>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <span className={css(this.styles.artist)}>歌手名</span>
                <p className={css(this.styles.lyric)}>歌詞データがここに入ります。歌詞データがここに入ります。</p>
                <a
                    className={css(this.styles.link)}
                    href="https://youtube.com/watch?v=2Kajce92A"
                    target="_blank"
                >Watch on Youtube</a>
            </React.Fragment>
        )
    }

    get containerStyle() {
        return [
            css(this.styles.container),
            this.props.isRistrict && css(this.styles.restrictedContainer),
        ].join(' ')
    }

    get styles() {
        return StyleSheet.create({
            container: {
                backgroundColor: '#fff',
                borderRadius: '3px',
                boxShadow: '0 2px 15px -5px #3f3f3f',
                boxSizing: 'border-box',
                flex: '1 0 90%',
                margin: '0 auto 1em',
                minWidth: '200px',
                padding: '0.75em 1.5em 1em',
                textAlign: 'left',
                width: '90%',
            },
            restrictedContainer: {
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingTop: '1.5em',
            },
            link: {
                color: '#539ad2',
                fontSize: '0.8em',
            },
            lyric: {
                color: '#333',
                fontSize: '0.9em',
                fontWeight: 'normal',
                letterSpacing: '1px',
                lineHeight: '1.78',
                marginTop: 0,
                marginBottom: '5px',
            },
            restrictLabel: {
                color: '#5f5f5f',
                fontSize: '0.8em',
                letterSpacing: '1px',
            },
            artist: {
                color: '#a0a0a0',
                fontSize: '0.68em',
                letterSpacing: '1px',
            },
        })
    }
}