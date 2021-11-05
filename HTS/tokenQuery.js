const { Client, PrivateKey, AccountId, TokenInfoQuery, TokenId, TokenBalanceMap} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Declare the Id and key of the account that will communicate with Hedera nodes
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    //Create client
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Query for the token
    const tokenId = TokenId.fromString(process.env.TOKENID);
    const queryTokenResponse = await new TokenInfoQuery()
    .setTokenId(tokenId)
    .execute(client);

    console.log("Token Info " + queryTokenResponse);

    //Check for Token Balance
    const tokenBalanceResponse = await new TokenBalanceMap()
    .setTokenId(tokenId)
    .execute(client);

    console.log("Token Balance " + tokenBalanceResponse);
}
main();