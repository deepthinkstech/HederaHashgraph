const { Client, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Declare the account ID and key for the account that will pay for the transactions
    const myAccountID = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    if (myAccountID == null) {
        throw new Error("Account ID cannot be null");
    } else if (myPrivateKey == null) {
        throw new Error("Private Key cannot be null");
    }

    //Create a client to interact with Hedera nodes
    const client = Client.forTestnet();
    client.setOperator(myAccountID, myPrivateKey);

    //Create a topic
    const createTopicResponse = await new TopicCreateTransaction()
    .setTopicMemo("Topic for random messages")
    .execute(client);

    //Get the topic ID
    const createTopicReceipt = await createTopicResponse.getReceipt(client);
    const topicId = createTopicReceipt.topicId
    console.log("Topic ID is " + topicId + ". It is of type " +typeof(topicId));

    //Submit a series of messages to the topic
    for (var i = 0; i < 10; i++) {
        const topicMessageSubmitResponse = await new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage("Here is message number " + i)
        .execute(client);
        
       
        const topicMessageSubmitReceipt = await topicMessageSubmitResponse.getReceipt(client);
        
        console.log("Message " + (i+1) + " sent. Message status " + topicMessageSubmitReceipt.status.toString());
    }
    //Get the messages submitted to the topic
    await new TopicMessageQuery()
    .setTopicId(topicId)
    .setStartTime(0)
    .subscribe(client,(message) => console.log(Buffer.from(message.contents, "utf8").toString()));

}
main();