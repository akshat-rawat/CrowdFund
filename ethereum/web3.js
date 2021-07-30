import Web3 from 'web3'
import { API } from './config'
let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  window.ethereum.request({ method: 'eth_requestAccounts' })
  web3 = new Web3(window.ethereum)
} else {
  const provider = new Web3.providers.HttpProvider(API)
  web3 = new Web3(provider)
}

export default web3
