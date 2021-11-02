const {Client, AccountId, TopicCreateTransaction, PrivateKey} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Declare the accountID and private key of the account that will pay for the transactions
    const myAccountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    //Create client
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Create Topic
    const createTopicResponse = await new TopicCreateTransaction()
    .setAdminKey(myPrivateKey)
    .setTopicMemo("Test Messages")
    .execute(client);
    
    const createTopicReceipt = await createTopicResponse.getReceipt(client);
    console.log("Topic ID is " + createTopicReceipt.topicId);
}
main();
