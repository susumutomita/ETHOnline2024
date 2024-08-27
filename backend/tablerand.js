import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey = ""; // Your private key
const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545),
// replace the URL with a provider like Alchemy, Infura, Etherscan, etc.
const provider = getDefaultProvider("http://127.0.0.1:8545"); // For example: "https://polygon-amoy.g.alchemy.com/v2/${process.env.YOUR_ALCHEMY_KEY}"
const signer = wallet.connect(provider);
// Connect to the database
const db = new Database({ signer });

console.log(db);

const { meta: create } = await db
  .prepare(`CREATE TABLE my_table (id int, val text);`)
  .all();
await create.txn?.wait();
const [tableName] = create.txn?.names ?? [];

console.log(tableName);
