const { Client, AccountBalanceQuery} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
//Declare the account ID and private key of the account that will pay for the transaction
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

//Ensure the values are not null
if (myAccountId == null || myPrivateKey == null){
    throw new Error("Account ID or Private Key cannot be null");
}

//Create Client to interact with Hedera nodes
const client = Client.forTestnet();

//Set the account information that will pay for interacting with the network
client.setOperator(myAccountId, myPrivateKey);

//Check the balance of the account
const checkBalAccId = process.env.CHECK_BAL_ACC_ID;
const checkBalResponse = await new AccountBalanceQuery()
.setAccountId(checkBalAccId)
.execute(client);

//Display hbar balance
console.log("The balance in the account " + checkBalAccId + " is " + checkBalResponse.hbars.toTinybars() + " tiny bars");

//Display token balance
console.log("The number of tokens in " + checkBalAccId + " is " + checkBalResponse.tokens.toString());

}
main();
