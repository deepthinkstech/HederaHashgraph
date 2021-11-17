const { Client, PrivateKey, AccountId, CustomRoyaltyFee, Hbar, CustomFixedFee, TokenCreateTransaction,TokenType, TokenSupplyType, TokenNftInfoQuery, TokenInfoQuery } = require("@hashgraph/sdk");
require("dotenv").config();

//I am here - https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1-how-to-mint-nfts
//Used npm install @hashgraph/sdk to install latest sdk into node_modules folder. Need to add it into the readme file on github
async function main(){
const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

//Create royalty fees that would be 0.5 of the NFT price or 200 Hbars
const customRoyaltyFeeResponse = await new CustomRoyaltyFee()
.setNumerator(5)
.setDenominator(10)
.setFeeCollectorAccountId(myAccountId)
.setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200)));

// IPFS CONTENT IDENTIFIERS FOR WHICH WE WILL CREATE NFTs
const CID = [
    "QmNPCiNA3Dsu3K5FxDPMG5Q3fZRwVTg14EXA92uqEeSRXn",
    "QmZ4dgAgt8owvnULxnKxNe8YqpavtVCXmc1Lt2XajFpJs9",
    "QmPzY5GxevjyfMUF5vEAjtyRoigzWp47MiKAtLBduLMC1T",
    "Qmd3kGgSrAwwSrhesYcY7K54f3qD7MDo38r7Po2dChtQx5",
    "QmWgkKz3ozgqtnvbCLeh7EaR1H8u5Sshx3ZJzxkcrT3jbw",
];
//Create NFT
const newNFTTokenResponse = await new TokenCreateTransaction()
.setTokenName("Fall Collection")
.setTokenSymbol("LEAF")
.setTokenType(TokenType.NonFungibleUnique)
.setDecimals(0)
.setInitialSupply(0)
.setTreasuryAccountId(myAccountId)
.setSupplyType(TokenSupplyType.Finite)
.setMaxSupply(CID.length)
.setCustomFees([customRoyaltyFeeResponse])
.setAdminKey(myPrivateKey)
.setSupplyKey(myPrivateKey)
.setPauseKey(myPrivateKey)
.setFreezeKey(myPrivateKey)
.setWipeKey(myPrivateKey)
.freezeWith(client)
.sign(myPrivateKey);

const submitTokenResponse = await newNFTTokenResponse.sign(myPrivateKey);
const createTokenResponse = await submitTokenResponse.execute(client);
const createTokenReceipt = await createTokenResponse.getReceipt(client);
const tokenId = createTokenReceipt.tokenId;

console.log("New NFT Token Id is " + tokenId);

// TOKEN QUERY TO CHECK THAT THE CUSTOM FEE SCHEDULE IS ASSOCIATED WITH NFT
var tokenInfo = await new TokenInfoQuery()
.setTokenId(tokenId)
.execute(client);
console.table(tokenInfo.customFees[0]);

}
main();

