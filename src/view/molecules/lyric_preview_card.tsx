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
                <p className={css(this.styles.lyric)}>歌詞データがここに入ります。歌詞データがここに入ります。</p>
                <a
                    className={css(this.styles.link)}
                    href="https://youtube.com/watch?v=2Kajce92A"
                    target="_blank"
                >この曲を聴く</a>
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
                flex: '1 0 60%',
                marginRight: '1em',
                minWidth: '180px',
                padding: '0.75em 1em',
                textAlign: 'left',
                width: '70vw',
            },
            restrictedContainer: {
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            },
            link: {
                color: '#539ad2',
                fontSize: '0.8em',
            },
            lyric: {
                color: '#333',
                fontSize: '1em',
                fontWeight: 'bold',
                letterSpacing: '0',
                lineHeight: '1.7',
                marginTop: 0,
            },
            restrictLabel: {
                color: '#5f5f5f',
                fontSize: '0.8em',
                letterSpacing: '1px',
            },
        })
    }
}