const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledStack = require('../ethereum/build/ProjectStack.json')
const compiledProject = require('../ethereum/build/Project.json')

let accounts, stack, project, projectAddress

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  stack = await new web3.eth.Contract(JSON.parse(compiledStack.interface))
    .deploy({ data: compiledStack.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  await stack.methods.createProject('100').send({
    from: accounts[0],
    gas: '1000000',
  })
  ;[projectAddress] = await stack.methods.getDeployedProjects().call()
  project = await new web3.eth.Contract(
    JSON.parse(compiledProject.interface),
    projectAddress,
  )
})

describe('Projects', () => {
  it('deployes a stack and a projects', () => {
    assert.ok(stack.options.address)
    assert.ok(project.options.address)
  })

  it('marks creator as the project manager', async () => {
    const manager = await project.methods.manager().call()

    assert.strictEqual(accounts[0], manager)
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await project.methods.contribute().send({
      value: '200',
      from: accounts[1],
    })
    const isContributor = await project.methods.approvers(accounts[1]).call()

    assert.strictEqual(isContributor, true)
  })

  it('requires a minimum contribution', async () => {
    try {
      await project.methods.contribute().send({
        value: '10',
        from: accounts[1],
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('allows managers to make a payment', async () => {
    await project.methods
      .createRequest('buy batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    const request = await project.methods.requests(0).call()

    assert.strictEqual('100', request.value)
  })

  it('processess requests', async () => {
    await project.methods.contribute().send({
      value: web3.utils.toWei('10', 'ether'),
      from: accounts[0],
    })

    await project.methods
      .createRequest(
        'buy batteries',
        web3.utils.toWei('5', 'ether'),
        accounts[1],
      )
      .send({ from: accounts[0], gas: '1000000' })

    await project.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    })

    await project.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)

    assert(balance > 104)
  })
})
