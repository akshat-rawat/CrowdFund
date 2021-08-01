import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Project from '../ethereum/project'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class RequestRow extends Component {
  onApprove = async () => {
    const project = Project(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await project.methods
      .approveRequest(this.props.id)
      .send({ from: accounts[0] })

    Router.replaceRoute(`/project/${this.props.address}/requests`)
  }

  onFinalize = async () => {
    const project = Project(this.props.address)

    const accounts = await web3.eth.getAccounts()
    await project.methods
      .finalizeRequest(this.props.id)
      .send({ from: accounts[0] })

    Router.replaceRoute(`/project/${this.props.address}/requests`)
  }

  render() {
    const { Row, Cell } = Table
    const { id, request, approversCount } = this.props
    const readyToFinalize = request.approvalCount > approversCount / 2

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id + 1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="purple" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    )
  }
}

export default RequestRow
