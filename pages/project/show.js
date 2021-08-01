import React, { Component } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Project from '../../ethereum/project'
import web3 from '../../ethereum/web3'
import Contribute from '../../components/Contribute'
import { Link } from '../../routes'

class ProjectShow extends Component {
  static async getInitialProps(props) {
    const project = Project(props.query.address)
    const summary = await project.methods.getSummary().call()

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    }
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of the Manager',
        description:
          'The manager creator this project and can create requests to withdraw funds',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much amount of wei to become an Approver',
      },
      {
        header: requestsCount,
        meta: 'Number of  Requests',
        description:
          'A requests to withdraw money from the project fund. Requests must be approved by Approvers',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this Project',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Project Balance (ether)',
        description:
          'The balance is how much money the Project has left to spend',
      },
    ]
    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Project Details</h3>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <Contribute address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/project/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default ProjectShow
