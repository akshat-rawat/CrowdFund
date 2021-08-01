import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import { Link } from '../../../routes'
import Project from '../../../ethereum/project'
import ReqeustRow from '../../../components/RequestRow'

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const project = Project(address)
    const requestCount = await project.methods.getRequestsCount().call()
    const approversCount = await project.methods.approversCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((ele, index) => {
          return project.methods.requests(index).call()
        }),
    )

    return { address, requests, requestCount, approversCount }
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <ReqeustRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      )
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/project/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Descripton</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount}</div>
      </Layout>
    )
  }
}

export default RequestIndex
