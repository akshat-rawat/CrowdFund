import web3 from './web3'
import ProjectStack from './build/ProjectStack.json'
import { DEPLOYED_ADDRESS } from './config'

const stack = new web3.eth.Contract(
  JSON.parse(ProjectStack.interface),
  DEPLOYED_ADDRESS,
)

export default stack
