const { Client, PrivateKey, AccountCreateTransaction, Hbar, AccountBalanceQuery} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Import my account ID and private key for invoking the client
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
   
    //Check if account or private key is null
    if (myAccountId == null || myPrivateKey == null){
        throw new Error ("Account ID and Private Key cannot be null");
    }
    //Create a node client
    const client = Client.forTestnet();
   
    //Set parameters - which account will be paying for the transactions and which key will sign the transactions
    client.setOperator(myAccountId, myPrivateKey);
  
    //Create Keys for Deep's Account
    const deepPrivateKey = await PrivateKey.generate();
    const deepPublicKey = deepPrivateKey.publicKey;
    console.log(typeof(deepPublicKey));

  //Not a good practice
    console.log("Deep's Private Key " + deepPrivateKey);
    console.log("Deep's Public Key " + deepPublicKey);

   ///Create Keys for Ted's Account 
    const tedPrivateKey = await PrivateKey.generate();
    const tedPublicKey = tedPrivateKey.publicKey;

  //Not a good practice
    console.log("Ted's Private Key " + tedPrivateKey);
    console.log("Ted's Public Key " + tedPublicKey);

    //Create Deep's account
    const deepCreateResponse = await new AccountCreateTransaction()
    .setKey(deepPublicKey)
    .setInitialBalance(Hbar.fromTinybars(200000000000))
    .execute(client);

    //Get the account ID of Deep's account
    const deepCreateReceipt = await deepCreateResponse.getReceipt(client);
    const deepAcc = deepCreateReceipt.accountId;
    console.log("Deep's account ID " + deepAcc);

    //Create Ted's account
    const tedCreateResponse = await new AccountCreateTransaction()
    .setKey(tedPublicKey)
    .setInitialBalance(Hbar.fromTinybars(0))
    .execute(client);

    //Get the account ID of Ted's account
    const tedCreateReceipt = await tedCreateResponse.getReceipt(client);
    const tedAcc = tedCreateReceipt.accountId;
    console.log("Ted's account ID " + tedAcc);

   //Check balance before transfer
   const deepBalanceBefore = await new AccountBalanceQuery()
   .setAccountId(deepAcc)
   .execute(client);
   console.log("Deep's account has " + deepBalanceBefore.hbars.toTinybars() + " Tiny bars before transfer");

   const tedBalanceBefore = await new AccountBalanceQuery()
   .setAccountId(tedAcc)
   .execute(client);
   console.log("Ted's account has " + tedBalanceBefore.hbars.toTinybars() + " Tiny bars before transfer");

}
main();