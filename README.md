## Requirements
Node.js, NPM, react.js, next.js, IPFS, Ganacheand Metamask wallet browser extension must be installed on the developer machine. [See installation guide](Installation-guide.MD)

## Getting Started
### Start IPFS
```bash
ipfs daemon --offline
```
### Start blockchain
Run Ganache App

### Start Application
Then, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Working with the Dapp Decental Boligformidling
### Sellerflow:
* Seller/owner enter real estate property and system present info from Tinglysning / Central Real estate Register (CRR) (TODO)
    * CRR should probably be mocked
    * To reach CRR go through Oracle e.g. ChainLink
    * Url (or Id) to Property is used as data in NFT
* Owner Creates a SelfSignedIdCertificate (SSIC) (Eventually use PolygonId):
    * A SSIC is a certificate containing:
        * Text telling: This wallet address (WA) belongs to this person (Name)
        * An Ethereum signature from the wallet
    * Sign SSIC with signature from e.g
            * NemId / MitId or
            * Passport signing app
            * Ethereum wallet
* Owner mints a real estate NFT:    
    * NFT is minted onto chain and ready for sale

### Buyer flow:
* Buyer browse for property and either click on Buy or View
    * Click on Buy indicates all documents are ready and the wallet opens and user accept the payment, the property is in the users property page
    * View show the case file where all info about the real estate is documented and verified status is shown
    * User when all document are in place the user can now buy the property

## Links

* [Build a Real Estate dApp With Chainlink Oracles](https://blog.chain.link/build-a-real-estate-dapp-with-chainlink-oracles/)
* [Web3 JWT auth example](https://twitter.com/isaacpatka/status/1422188383472848897)

## Credits

Thanks to

* Scheleton for the code [nft-marketplace-box](https://github.com/truffle-box/nft-marketplace-box) by @emilyJLin95
* [ETHOnline](https://online.ethglobal.com/)  

## Learn More about next.js
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
