import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import { Link, Router } from '../../../routes'
import Project from '../../../ethereum/project'
import web3 from '../../../ethereum/web3'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false,
  }

  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }

  onSubmit = async () => {
    event.preventDefault()

    this.setState({ loading: true, errorMessage: '' })
    const project = Project(this.props.address)
    const { description, value, recipient } = this.state
    try {
      const accounts = await web3.eth.getAccounts()
      await project.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] })
      Router.replaceRoute(`/project/${this.props.address}/requests`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <Link route={`/project/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>

        <h3>Create a Request</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Descripton</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Contribute!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew
