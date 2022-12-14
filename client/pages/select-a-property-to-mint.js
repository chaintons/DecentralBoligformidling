import { useState } from 'react'
import { getWeb3Async } from '../utils/web3utils'

export default function SelectProperty({ 
    formInput, updateFormInput, 
    sellerEthAccount, setSellerEthAccount,
    sellerCertificateToSign, setSellerCertificateToSign, 
    setSellerWalletSignature }) {

    const [propertyOwner, setPropertyOwner] = useState('')
    const [dataToSignHash, setDataToSignHash] = useState('')

    function isDataToSignHashValid() {
        const isValid = (dataToSignHash != undefined && dataToSignHash != null && dataToSignHash.length>6)
        return isValid
    }

    function onChangeAddress(e) {
        updateFormInput({ ...formInput, address: e.target.value })
        setPropertyOwner('')
    }

    async function selectPropertyOnWeb2() {
        const res = await fetch(`api/mocks/select-property/${formInput.address}`)
        const json = await res.json()
        setPropertyOwner(json.owner)
        console.log(JSON.stringify(json.owner))
    }

    async function prepareCertificate(propertyOwner) {
        const web3 = await getWeb3Async()
        const accounts = await web3.eth.getAccounts()
        setSellerEthAccount(accounts[0])
        
        if (sellerEthAccount.length === 42) {
            console.log('myEthAddr ' + sellerEthAccount)

            setSellerCertificateToSign(`I, ${propertyOwner}, have signed this certificate 
            with my NemId and my ETH wallet address: ${sellerEthAccount}`)

            //console.log('certificateToSign ' + certificateToSign)
            setDataToSignHash(await web3.utils.keccak256(web3.utils.toHex(sellerCertificateToSign), {encoding:"hex"}));
            console.log('dataToSignHash ' + dataToSignHash)
        }
    }

    function signCertificateWithWalletCb(error, walletSignature) {
        if (error) {
            console.log('Error with signCertificateWithWallet ' + error)
            return
        }
        setSellerWalletSignature(walletSignature)
        console.log('walletSignature ' + walletSignature)
    }

    async function signCertificateWithWallet() {
        const web3 = await getWeb3Async()

        // Example of sign with ethers:
        // https://github.com/MetaMask/test-dapp/blob/main/src/index.js#L879
        // Which to choose? https://ethereum.stackexchange.com/a/25610
        web3.eth.sign(dataToSignHash, sellerEthAccount, signCertificateWithWalletCb)
    }

    return (
        <>
            <div className="card">
                <input 
                    placeholder="Address"
                    className="mt-8 border rounded p-4"
                    onChange={e => onChangeAddress(e)}
                />
                <button 
                    onClick={selectPropertyOnWeb2} 
                    className="font-bold mt-4, ml-4 bg-teal-400 text-white rounded p-4 shadow-lg"
                    disabled={!formInput.address}>
                    Select Property
                </button>
                <div 
                    className="pt-4"
                    hidden={!propertyOwner}>
                    <span>
                        Are you {propertyOwner} the owner of {formInput.address}?
                    </span>
                    <button 
                        onClick={e => prepareCertificate(propertyOwner)} 
                        className="font-bold mt-4, ml-4 bg-teal-400 text-white rounded p-4 shadow-lg"
                        disabled={!formInput.address}>
                        Yes, continue to sign proofs
                    </button>
                </div>
                <div 
                    className="pt-4"
                    hidden={!propertyOwner||!sellerCertificateToSign||!isDataToSignHashValid()}>
                    <div>Proove that you own wallet address {sellerEthAccount} by singing following certificate:</div>
                    <br></br>
                    <div>
                        <i>{sellerCertificateToSign}</i>
                    </div>
                    <button 
                        onClick={e => signCertificateWithWallet()} 
                        className="font-bold mt-4 bg-teal-400 text-white rounded p-4 shadow-lg">
                        Sign cetificate with you wallet
                    </button>
                    <button 
                        // onClick={e => bbbb(propertyOwner)} 
                        className="font-bold mt-4 ml-4 bg-teal-400 text-white rounded p-4 shadow-lg"
                        disabled>
                        Sign cetificate with MitId
                    </button>
                </div>
            </div>
        </>
    )
}