import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import stack from '../ethereum/stack'
import Layout from '../components/Layout'
import { Link } from '../routes'

class ProjectIndex extends Component {
  static async getInitialProps() {
    const projects = await stack.methods.getDeployedProjects().call()
    return { projects }
  }

  renderProjects() {
    const items = this.props.projects.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/project/${address}`}>
            <a>View Project</a>
          </Link>
        ),
        fluid: true,
      }
    })

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Projects</h3>

          <Link route="/project/new">
            <a>
              <Button
                content="Create Project"
                icon="add circle"
                floated="right"
                primary
              />
            </a>
          </Link>

          {this.renderProjects()}
        </div>
      </Layout>
    )
  }
}

export default ProjectIndex
