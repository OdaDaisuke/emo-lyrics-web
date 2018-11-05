import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaPlay } from 'react-icons/fa'

interface IPlayButtonProps {
    link: string
    className?: string
    black?: boolean
}

export const PlayButton = (props: IPlayButtonProps) => {
    const styles = StyleSheet.create({
        link: {
            alignItems: 'center',
            borderRadius: '50%',
            border: (props.black) ? '1px solid #20203f' : '1px solid #fff',
            color: (props.black) ? '#20203f' : '#fff',
            display: 'flex',
            flex: '0 1 auto',
            fontSize: '1em',
            height: 40,
            justifyContent: 'center',
            marginRight: 15,
            paddingLeft: 2,
            textAlign: 'center',
            textDecoration: 'none',
            width: 38,
        },
    })

    const className = [
        css(styles.link),
        props.className || "",
    ].join(" ")

    return (
        <a
            className={className}
            href={props.link}
            target="_blank"
        >
            <FaPlay />
        </a>
    )
}