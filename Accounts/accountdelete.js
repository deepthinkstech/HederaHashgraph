const { Client, AccountBalanceQuery, AccountDeleteTransaction} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
     //Import my account ID and private key for invoking the client
     const myAccountId = process.env.DEL_ACC_ID;
     const myPrivateKey = process.env.DEL_ACC_PRIVATE_KEY;
 
     //Check if account or private key is null
     if (myAccountId == null || myPrivateKey == null){
         throw new Error ("Account ID and Private Key cannot be null");
     }
     //Create a node client
     const client = Client.forTestnet();
    
     //Set parameters - which account will be paying for the transactions and which key will sign the transactions
     client.setOperator(myAccountId, myPrivateKey);

     //Transfer account balance to my account before deletion of the account

     //Check Account Balance before deletion
     const accountBalance = await new AccountBalanceQuery()
        .setAccountId(myAccountId)
        .execute(client);
           
    const balanceInTinyBars = accountBalance.hbars.toTinybars();
    console.log("Balance in " + myAccountId + " is " + balanceInTinyBars);
 

    //Delete account
    
        const deleteAccountResponse = await new AccountDeleteTransaction()
            .setTransferAccountId(process.env.TED_ACCOUNT_ID)
            .setAccountId(myAccountId)
            .execute(client);
        
        const deleteAccountReceipt = await deleteAccountResponse.getReceipt(client);
            console.log("The deletion of " + myAccountId + " is " + deleteAccountReceipt.status.toString());
 
}
main();