import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import stack from '../../ethereum/stack'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class ProjectNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
  }

  onSubmit = async () => {
    event.preventDefault()

    this.setState({ loading: true, errorMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await stack.methods.createProject(this.state.minimumContribution).send({
        from: accounts[0],
      })
      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <h2>Create new Project</h2>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default ProjectNew
