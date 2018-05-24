import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { bind } from 'bind-decorator'

export interface IinputProps {
  placeholder?: any
  maxLength?: any
  type: any
  vm: InputVm
}

@observer
export class Input extends React.Component<IinputProps, any> {
  render(): JSX.Element {
    return (
      <input
        onChange={(e: any) => this.onChange(e.target.value)}
        placeholder={this.placeholder}
        className={css(this.style.input)}
	value={this.props.vm.value}
      />
    )
  }

  @bind
  onChange(s: string) {
    this.props.vm.value = s
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

export class InputVm {
  @observable
  value: string = ""
  initialize() {
  }
}
