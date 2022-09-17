import Web3 from 'web3'
import Web3Modal from 'web3modal'

export const getWeb3Async = async () => {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    return web3
}
