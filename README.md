# CrowdFund

<p align="center">
  <img src="https://github.com/akshat-rawat/akshat-rawat.github.io/blob/main/images/crowdfund.jpg?raw=true">
 </p>
 
## About
1. A decentralized crowdfunding platform based on the Ethereum Blockchain. 
1. The project is a decentralized crowdfunding platform designed to address the issue of money being misappropriated through standard crowdfunding platforms.
1. Blockchain assisted in keeping track of the money received through the app and storing it under the supervision of smart contract.
1. As a result, no money should ever fall into the wrong hands, and there should be no chance of it being misappropriated. Thus, we are able to arrive at a logical solution to the situation at hand.
1. You can develop projects demanding a minimum donation, just like you do in the real world.
1. The manager will be unable to utilize funds unless he or she receives more than 50% approval in voting.

## Installation

### Install Git
* Follow instructions from [Git Website](https://git-scm.com/downloads)

### Install Node.js and NPM
* Follow instructions from [Node.js Website](https://nodejs.org/en/download/)

### Cloning Repository and Installation
* Clone the Repository
```bash
git clone https://github.com/akshat-rawat/CrowdFund.git
```
* Change working Directory to the Repository
```bash
cd CrowdFund
```
* Install Dependencies
```bash
npm install
```
* Create a `config.js` file inside **ethereum** folder and add the following:
```sh
mmodule.exports = {
  METAMASK_ADDRESS: <Metamask Secret Phrase>,
  API: <API Key>,
  DEPLOYED_ADDRESS: <Address of Deployed Contract>
}
```
* Initiate the server
```bash
npm start
```
* Access the [Application](http://localhost:3000)

### Technology Stack
* ReactJS
* Next.js
* Solidity
* Ethereum Smart Contract
