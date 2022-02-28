const {Client, AccountId, PrivateKey, TokenCreateTransaction,TokenSupplyType} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    //Create client to access testnet
    const accountId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const privateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    
    const client = Client.forTestnet();
    client.setOperator(accountId,privateKey);

    //Set token supply to finite
    const supplyType = TokenSupplyType.Finite;

    //Create fungible tokens representing carbon credits worth 1000 metric tons of carbon
    const createTokenResponse = await new TokenCreateTransaction()
    .setTokenName("CarbonToken")
    .setTokenSymbol("CT")
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(accountId)
    .setAdminKey(privateKey)
    .setKycKey(privateKey)
    .setFreezeKey(privateKey)
    .setWipeKey(privateKey)
    .setSupplyKey(privateKey)
    .setTokenMemo("Fungible tokens representing carbon credits worth 1000 metric tons of carbon")
    .setSupplyType(supplyType)
    .setMaxSupply(1000)
    .execute(client);

    //Print the token ID with other information
    const createTokenReceipt = await createTokenResponse.getReceipt(client);
    console.log("Token ID is " + createTokenReceipt.tokenId);
    //console.log("Additional information about the token " + createTokenReceipt);

}

main();