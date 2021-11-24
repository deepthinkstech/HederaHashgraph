const { Client, AccountId, PrivateKey, TokenId, AccountUpdateTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Create Client
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);
    //I am here - https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1-how-to-mint-nfts
}