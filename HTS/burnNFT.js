const { Client, PrivateKey, AccountId, TokenId, TokenBurnTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

//I am here - https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1-how-to-mint-nfts
//Used npm install @hashgraph/sdk to install latest sdk into node_modules folder. Need to add it into the readme file on github
async function main() {
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const tokenId = TokenId.fromString(process.env.TOKENID);
// IPFS CONTENT IDENTIFIERS FOR WHICH WE WILL CREATE NFTs
const CID = [
    "QmNPCiNA3Dsu3K5FxDPMG5Q3fZRwVTg14EXA92uqEeSRXn",
    "QmZ4dgAgt8owvnULxnKxNe8YqpavtVCXmc1Lt2XajFpJs9",
    "QmPzY5GxevjyfMUF5vEAjtyRoigzWp47MiKAtLBduLMC1T",
    "Qmd3kGgSrAwwSrhesYcY7K54f3qD7MDo38r7Po2dChtQx5",
    "QmWgkKz3ozgqtnvbCLeh7EaR1H8u5Sshx3ZJzxkcrT3jbw",
];

//Burn the last NFT created
const tokenBurnPrepTx = await new TokenBurnTransaction()
.setTokenId(tokenId)
.setSerials([CID.length])
.freezeWith(client)
.sign(myPrivateKey);

const tokenBurnResponse = await tokenBurnPrepTx.execute(client);
const tokenBurnReceipt = await tokenBurnResponse.getReceipt(client);
console.log("After burn the number of tokens left is " + tokenBurnReceipt.totalSupply);
}
main();