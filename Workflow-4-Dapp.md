## Workflow for Decental Boligformidling

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
    * NFT is minted onto chain

### Buyer flow:
* Buyer enter real estate property and system present info from Tinglysning / Central Real estate Register (CRR) (TODO)
    * CRR should probably be mocked
    * To reach CRR go through Oracle e.g. ChainLink
    * Url (or Id) to Property is used as data in NFT

...