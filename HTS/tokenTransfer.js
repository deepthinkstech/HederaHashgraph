const { Client, PrivateKey, AccountId, TokenId, TransferTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Declare the Id and key of the account used for this transaction
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    //Create Client
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Transfer tokens from "treasury" account to associated account. The account which created the tokens could be considered as the treasury.
    const tokenId = TokenId.fromString(process.env.TOKENID);
    const associateAccId = AccountId.fromString(process.env.TED_ACCOUNT_ID);
    const tokenTransferResponse = await new TransferTransaction()
    .addTokenTransfer(tokenId, myAccountId, -10)
    .addTokenTransfer(tokenId, associateAccId, 10)
    .execute(client);

    const tokenTransferReceipt = await tokenTransferResponse.getReceipt(client);
    console.log("The token has been transfered from " + myAccountId + " to " + associateAccId + " with " + tokenTransferReceipt.status.toString());
}
main();