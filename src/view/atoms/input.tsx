import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'

export interface IinputProps {
  onChange: any
  placeholder?: any
  maxLength?: any
  type: any
}

export class Input extends React.Component<IinputProps, any> {
  render(): JSX.Element {
    return (
      <input
        onChange={this.props.onChange}
        placeholder={this.placeholder}
        className={css(this.style.input)}
      />
    )
  }

  get style() {
    return StyleSheet.create({
      input: {
	cursor: 'pointer',
	outline: 'none',
	paddingTop: '5px',
	paddingRight: '12px',
	paddingBottom: '5px',
	paddingLeft: '12px',
	':focus': {
	  cursor: 'text',
	},
      },
    })
  }

  get placeholder() {
     if(this.props.placeholder) {
         return this.props.placeholder
     }
     return null
  }

  get type(): string {
    switch(this.props.type) {
      case "text":
      case "password":
        return this.props.type
      default:
        return "text"
    }
  }

}
