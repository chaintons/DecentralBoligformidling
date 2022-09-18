import Web3 from 'web3';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'
import { Marketplace, BoredPetsNFT } from './contracts-import'
import { getWeb3Async } from '../utils/web3utils'

export default function NftDetails() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()
  const { id, tokenURI } = router.query
  //const [tokenURIq, setTokenURIq] = useState(tokenURI)
  console.log("tokenURI" + tokenURI)
  console.log("id" + id)
  useEffect(() => { loadNFTs() }, [])

  async function loadNFTs() {
    const web3 = await getWeb3Async()
    const networkId = await web3.eth.net.getId()
    const marketPlaceContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address)
    const boredPetsContractAddress = BoredPetsNFT.networks[networkId].address
    const boredPetsContract = new web3.eth.Contract(BoredPetsNFT.abi, boredPetsContractAddress)
    const accounts = await web3.eth.getAccounts()
    const data = await marketPlaceContract.methods.getMyNfts().call({from: accounts[0]})

    console.log(tokenURI)
    const meta = await axios.get(tokenURI)
    let nft = {

      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      tokenURI: tokenURI,
      propertyAddress: meta.data.propertyAddress,
    }
    console.debug(nft.description)
    console.debug("nft.name" + nft.name)

    /*
    const nfts = await Promise.all(data.map(async i => {
      try {
        const tokenURI = await boredPetsContract.methods.tokenURI(i.tokenId).call()
        const meta = await axios.get(tokenURI)
        let nft = {
          price: i.price,
          tokenId: i.tokenId,
          seller: i.seller,
          owner: i.buyer,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          tokenURI: tokenURI
        }
        return nft
      } catch(err) {
        console.log(err)
        return null
      }
    }))
    */
    //setNfts(nfts.filter(nft => nft !== null))
    setLoadingState('loaded')
  }

  function listNFT(nft) {
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>);
  } else {
    return (
      <div className="flex justify-center">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              // nfts.map((nft, i) => (
              //   <div key={i} className="border shadow rounded-xl overflow-hidden">
              //     <img src={nft.image} className="rounded" />
              //     <div className="p-4">
              //       <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
              //       <div style={{ height: '70px', overflow: 'hidden' }}>
              //         <p className="text-gray-400">{nft.description}</p>
              //       </div>
              //     </div>
              //     <div className="p-4 bg-black">
              //       <p className="text-2xl font-bold text-white">Price - {Web3.utils.fromWei(nft.price, "ether")} Ether</p>
              //       <button className="mt-4 w-full bg-teal-400 text-white font-bold py-2 px-12 rounded" onClick={() => listNFT(nft)}>Sell</button>
              //     </div>
              //   </div>
              // ))
            }
          </div>
        </div>
      </div>
    );
  }
}