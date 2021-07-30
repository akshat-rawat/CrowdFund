const HDWallterProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledStack = require('../ethereum/build/ProjectStack.json')
const { METAMASK_ADDRESS, API } = require('./config')

const provider = new HDWallterProvider(METAMASK_ADDRESS, API)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from', accounts[0])

  const result = await new web3.eth.Contract(
    JSON.parse(compiledStack.interface),
  )
    .deploy({ data: compiledStack.bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}
deploy()
