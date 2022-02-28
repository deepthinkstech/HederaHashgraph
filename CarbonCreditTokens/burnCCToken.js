const {Client, AccountId, PrivateKey, TokenId, TokenBurnTransaction, AccountBalanceQuery} = require("@hashgraph/sdk");
require ("dotenv").config();

async function main(){
    //Create client to access testnet
    const accountId = AccountId.fromString(process.env.TED_ACCOUNT_ID);
    const privateKey = PrivateKey.fromString(process.env.TED_PRIVATE_KEY);
    
    const client = Client.forTestnet();
    client.setOperator(accountId,privateKey);

    //Get the token ID
    const ccTokenId = TokenId.fromString(process.env.CARBONCREDITTOKENID);

    //Get the current token balance
    const tokenBalanceResponse = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

    console.log("The current token balance is " + tokenBalanceResponse.tokens.toString());

    //Burn the Carbon Credit token
    const tokenBurnAmt = 10;
    const tokenBurnTx = await new TokenBurnTransaction()
    .setTokenId(ccTokenId)
    .setAmount(tokenBurnAmt)
    .freezeWith(client)
    .sign(privateKey);
    
    const tokenBurnResponse = await tokenBurnTx.execute(client);

    const tokenBurnReceipt = await tokenBurnResponse.getReceipt(client);
    console.log("Token Burn is " + tokenBurnReceipt.status.toString());

    //Check the new balance
    const tokenNewBalanceResponse = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

    console.log("The new token balance is " + tokenNewBalanceResponse.tokens.toString());

}
main();