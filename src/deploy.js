const fs = require('fs');
const account = await near.account("hoangnh_xda.testnet");
const contractName = "lockup-owner-id";
const newArgs = {
  "lockup_duration": "31536000000000000",
  "lockup_start_information": {
    "TransfersDisabled": {
        "transfer_poll_account_id": "transfers-poll"
    }
  },
  "vesting_schedule": {
    "start_timestamp": "1535760000000000000",
    "cliff_timestamp": "1567296000000000000",
    "end_timestamp": "1661990400000000000"
  },
  "staking_pool_whitelist_account_id": "staking-pool-whitelist",
  "initial_owners_main_public_key": "KuTCtARNzxZQ3YvXDeLjx83FDqxv2SdQTSbiq876zR7",
  "foundation_account_id": "near"
}
const result = account.signAndSendTransaction(
    contractName,
    [
        nearAPI.transactions.createAccount(),
        nearAPI.transactions.transfer("100000000000000000000000000"),
        nearAPI.transactions.deployContract(fs.readFileSync("res/lockup_contract.wasm")),
        nearAPI.transactions.functionCall("new", Buffer.from(JSON.stringify(newArgs)), 100000000000000, "0"),
    ]);
