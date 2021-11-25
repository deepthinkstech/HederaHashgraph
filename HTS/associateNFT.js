const { Client, AccountId, PrivateKey, TokenId, AccountUpdateTransaction, TokenAssociateTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Create Client
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Declare the account to which tokens will be auto-associated
    const deepAccount = AccountId.fromString(process.env.DEEP_ACCOUNT_ID);
    const deepPrivateKey = PrivateKey.fromString(process.env.DEEP_PRIVATE_KEY);

    //Auto-associate tokens to one account
    const associateAutoTx = await new AccountUpdateTransaction()
    .setAccountId(deepAccount)
    .setMaxAutomaticTokenAssociations(50)
    .freezeWith(client)
    .sign(deepPrivateKey)

    const associateAutoTxResponse = await associateAutoTx.execute(client);
    const associateAutoTxReceipt = await associateAutoTxResponse.getReceipt(client);

    console.log("Tokens have been auto-associated with Deep with " + associateAutoTxReceipt.status.toString());

    //Declare the account to which tokens will be manually associated
    const tedAccount = AccountId.fromString(process.env.TED_ACCOUNT_ID);
    const tedPrivateKey = PrivateKey.fromString(process.env.TED_PRIVATE_KEY);

    const tokenId = TokenId.fromString(process.env.TOKENID);

   //Manual association of tokens to an account
    const associateManualTx = await new TokenAssociateTransaction()
    .setAccountId(tedAccount)
    .setTokenIds([tokenId])
    .freezeWith(client)
    .sign(tedPrivateKey)

    const associateManualTxResponse = await associateManualTx.execute(client);
    const associateManualTxReceipt = await associateManualTxResponse.getReceipt(client);

    console.log("Tokens have been manually associated with Ted with " + associateManualTxReceipt.status.toString());
    

    //I am here - https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1-how-to-mint-nfts
}

main();