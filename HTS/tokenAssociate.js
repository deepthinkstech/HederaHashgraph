const { Client, PrivateKey, AccountId, TokenAssociateTransaction, TokenId} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Declare the ID and key of the account that would interact with Hedera nodes
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    //Create Client
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Declare the token to associate, account to which we want to associate the tokens
    const tokenId = TokenId.fromString(process.env.TOKENID);
    const associateAccId = AccountId.fromString(process.env.TED_ACCOUNT_ID);
    const associatePrivKey = PrivateKey.fromString(process.env.TED_PRIVATE_KEY);

    //Associate token to an account to which we want to transfer some tokens
    const associateToken = await new TokenAssociateTransaction()
    .setAccountId(associateAccId)
    .setTokenIds([tokenId]) //An array of tokens can be associated with the same account
    .freezeWith(client) //Example says freeze, but looks like in v2 it needs to be to freeWith()
    .sign(associatePrivKey);

    const associateTokenResponse = await associateToken
    .execute(client);

    const associateTokenReceipt = await associateTokenResponse.getReceipt(client);
    console.log("Token association to " + associateAccId + " has been " + associateTokenReceipt.status.toString());
}
main();