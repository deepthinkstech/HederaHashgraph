const { Client, Hbar, TransferTransaction, AccountBalanceQuery} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Deep will transfer 500 thbars to Ted
    //Import Deep's account ID and private key for invoking the client
    const myAccountId = process.env.DEEP_ACCOUNT_ID;
    const myPrivateKey = process.env.DEEP_PRIVATE_KEY;

    //Check if account or private key is null
    if (myAccountId == null || myPrivateKey == null){
        throw new Error ("Account ID and Private Key cannot be null");
    }
    //Create a node client
    const client = Client.forTestnet();
   
    //Set parameters - which account will be paying for the transactions and which key will sign the transactions
    client.setOperator(myAccountId, myPrivateKey);

    //Check balance before transfer
    //Deep's Account balance
    const deepAccBalance = await new AccountBalanceQuery()
    .setAccountId(myAccountId)
    .execute(client);

    console.log("Deep's account has " + deepAccBalance.hbars.toTinybars() + " tiny bars");

    //Declare who the recipient is
    const recipient = process.env.TED_ACCOUNT_ID;

    //Check balance of recipient's account
    const recAccBalance = await new AccountBalanceQuery()
    .setAccountId(recipient)
    .execute(client);

    console.log("Recipient is Ted and his account has " + recAccBalance.hbars.toTinybars() + " tiny bars");

    //Initiate transfer
    const transferHbars = await new TransferTransaction()
    .addHbarTransfer(recipient, Hbar.fromTinybars(1000000))
    .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000000))
    .execute(client);

    //Check if the transfer was successful
    const transferHbarsReceipt = await transferHbars.getReceipt(client);
    console.log("The transfer from Deep's account to Ted's account is " + transferHbarsReceipt.status.toString());

    //Check balances after transfer
    const deepAccBalAfter = await new AccountBalanceQuery()
    .setAccountId(myAccountId)
    .execute(client);
    console.log("Deep's account now has " + deepAccBalAfter.hbars.toTinybars() + " tiny bars");

    const tedAccBalAfter = await new AccountBalanceQuery()
    .setAccountId(recipient)
    .execute(client);
    console.log("Ted's account now has " + tedAccBalAfter.hbars.toTinybars() +  " tiny bars");

}
main();