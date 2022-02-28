const { Client, AccountId, PrivateKey, TokenId, TransferTransaction} = require("@hashgraph/sdk");
require ("dotenv").config();

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

    //Transfer carbon credit tokens to receipient account
    const ccTokenTransfer = await new TransferTransaction()
    .addTokenTransfer(ccTokenId,transferAccount, 10)
    .addTokenTransfer(ccTokenId,accountId, -10)
    .execute(client);

    //Display result
    const ccTokenTransferReceipt = await ccTokenTransfer.getReceipt(client);
    console.log("Carbon Token Transfer is " + ccTokenTransferReceipt.status.toString());
}
main();