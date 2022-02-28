const { Client, AccountId, PrivateKey, TokenGrantKycTransaction, TokenId} = require("@hashgraph/sdk");
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

    //KYC of the account - Approve the account for token transfer
    const accountGrantKYCResponse = await new TokenGrantKycTransaction()
    .setTokenId(ccTokenId)
    .setAccountId(transferAccount)
    .execute(client);

    //Display the result
    const accountGrantKYCReceipt = await accountGrantKYCResponse.getReceipt(client);
    console.log("Status " + accountGrantKYCReceipt.status);
    console.log("Transaction Hash " + accountGrantKYCResponse.transactionHash);
}
main();