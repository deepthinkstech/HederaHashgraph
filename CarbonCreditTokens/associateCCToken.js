const { Client, AccountId, PrivateKey, TokenId, TokenAssociateTransaction} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Create client to access testnet
    const accountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const privateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    
    const client = Client.forTestnet();
    client.setOperator(accountId,privateKey);

    //Get the token ID
    const ccTokenId = TokenId.fromString(process.env.CARBONCREDITTOKENID);

    //Get the account to which these tokens will be transferred
    const transferAccount = AccountId.fromString(process.env.TED_ACCOUNT_ID);
    const transferAccountPriKey = PrivateKey.fromString(process.env.TED_PRIVATE_KEY);

    //Associate Token to the Account
    const associateTokenReady= await new TokenAssociateTransaction()
    .setAccountId(transferAccount)
    .setTokenIds([ccTokenId])
    .freezeWith(client)
    .sign(transferAccountPriKey)

    const associateTokenResponse = await associateTokenReady
    .execute(client);

    //Display the result
    const associateTokenReceipt = await associateTokenResponse.getReceipt(client);
    console.log("Status " + associateTokenReceipt.status);
}
main();