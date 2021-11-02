const { Client, TokenCreateTransaction, PrivateKey, AccountId} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Create client to interact with Hedera nodes
    const myAccountID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    const client = Client.forTestnet();
    client.setOperator(myAccountID, myPrivateKey);

    //Create a token
    const createTokenResponse = await new TokenCreateTransaction()
    .setAdminKey(myPrivateKey)
    .setTokenName("DeepToken1")
    .setDecimals(0)
    .setInitialSupply(100)
    .setTreasuryAccountId(myAccountID)
    .setTokenSymbol("+D")
    .execute(client);

    const createTokenReceipt = await createTokenResponse.getReceipt(client);
    console.log("Token ID is " + createTokenReceipt.tokenId);

}
main();