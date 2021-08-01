import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Project from '../ethereum/project'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class Contribute extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async () => {
    event.preventDefault()

    this.setState({ loading: true, errorMessage: '' })
    const project = Project(this.props.address)
    try {
      const accounts = await web3.eth.getAccounts()
      await project.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      })
      Router.replaceRoute(`/project/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default Contribute
