import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { bind } from 'bind-decorator'
import { Input, InputVm, Button } from '../atoms'
import { AccountService } from '../../domain'

export interface TwitterVerifyFormProps {
  vm: TwitterVerifyFormVM
  history: any
}

@observer
export class TwitterVerifyForm extends React.Component<TwitterVerifyFormProps, any> {
  private inputVm: InputVm = new InputVm()
  constructor(props: TwitterVerifyFormProps) {
    super(props)
    this.props.vm.initialize()
  }

  render(): JSX.Element {
    return (
      <div>
	<p>認証コードを入力</p>
	<Input
	  vm={this.inputVm}
	  type="text"
	/>
	<Button label="送信" onClick={this.onSubmit} />
      </div>
    )
  }

  @bind
  onSubmit() {
    this.props.vm.sendVerificationCode(this.inputVm.value)
    // if(this.props.vm.verifyResult) {
      this.props.vm.saveUser()
      this.props.history.push("/lyric")
    // } else {
    //   alert("エラーが発生しました。コードが間違っているようです。")
    // }
  }

}

export class TwitterVerifyFormVM {
  private accountService: AccountService | null = null

  @observable verifyResult: boolean = false

  initialize() {
    this.accountService = new AccountService()
  }

  sendVerificationCode(s: string) {
    if(!this.accountService) {
      return null
    }
    this.accountService.sendVerificationCode(s, this.verifyCodeCallback)
  }

  saveUser() {
    if(this.accountService) {
      this.accountService.saveAccount()
    }
  }

  @bind
  verifyCodeCallback(result: boolean) {
    this.verifyResult = result
  }

}
