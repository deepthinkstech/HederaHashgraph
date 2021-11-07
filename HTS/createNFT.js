const { Client, PrivateKey, AccountId, CustomRoyaltyFee, Hbar, CustomFixedFee } = require("@hashgraph/sdk");
require("dotenv").config();

//I am here - https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1-how-to-mint-nfts
//Used npm install @hashgraph/sdk to install latest sdk into node_modules folder. Need to add it into the readme file on github

const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const customRoyaltyFeeResponse = await new CustomRoyaltyFee()
.setNumerator(5)
.setDenominator(10)
.setFeeCollectorAccountId(myAccountId)
.setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200)));
