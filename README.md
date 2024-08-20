# Irys Bundler SDK

The Irys Bundler SDK is a typesafe SDK for uploading data to the Irys network. 

## What is Irys?

Irys is the first L1 programmable datachain, designed to optimize data storage and execution. By combining storage and execution, it significantly increases the usefulness of blockspace, enabling a wider range of web services to come onchain that aren’t possible right now.

Irys empowers developers to create and innovate like never before. With Irys, builders can eliminate dependencies, integrate efficient onchain data, and unlock new possibilities for dynamic, real-time applications—all within a unified platform.

> This SDK is for uploading data only. 

## Irys SDK Quickstart

### Installing

Install using npm:

```console
npm install @irys-network/bundler-sdk
```

or yarn:

```console
yarn add  @irys-network/bundler-sdk
```


>If you get a warning saying `bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)` during install, it can be safely ignored. 

### Importing

```js
import Irys from "@irys-network/bundler-sdk";
```

### Connecting to Irys

Connect using a private key tied to an EVM or Solana wallet:

```js
const getIrys = async () => {
	const network = "testnet";
	// RPC URLs change often, use a recent one from https://chainlist.org/
	const providerUrl = "";
	const token = "ethereum";

	const irys = new Irys({
		network,
		token, // Token used for payment
		key: process.env.PRIVATE_KEY, // ETH or SOL private key
		config: { providerUrl }, // RPC Provider URL, required.
	});
	return irys;
};
```

### Funding Your Testnet Account

Fund Irys using any of our supported tokens.

| Token / Blockchain | Token | Parameter Value | `Irys` Support | `WebIrys` Support |
| ------------------ | ----- | --------------- | -------------- | ----------------- |
| Aptos              | APT   | aptos           | yes            | yes               |
| Algorand           | ALGO  | algorand        | yes            | no                |
| Arbitrum           | ETH   | arbitrum        | yes            | yes               |
| Avalanche C-Chain  | AVAX  | avalanche       | yes            | yes               |
| Berachain          | BERA  | bera            | yes            | yes               |
| Binance Coin       | BNB   | bnb             | yes            | yes               |
| Boba               | BOBA  | boba            | yes            | yes               |
| Boba-eth           | ETH   | boba-eth        | yes            | yes               |
| Chainlink          | LINK  | chainlink       | yes            | yes               |
| Eclipse            | ETH   | eclipse         | yes            | yes               |
| Ethereum           | ETH   | ethereum        | yes            | yes               |
| Base Ethereum      | ETH   | base-eth        | yes            | yes               |
| Linea Ethereum     | ETH   | linea-eth       | yes            | yes               |
| Scroll Ethereum    | ETH   | scroll-eth      | yes            | yes               |
| Fantom             | FTM   | fantom          | yes            | yes               |
| IoTeX              | IoTeX | iotex           | yes            | yes               |
| Near               | NEAR  | near            | yes            | yes               |
| Polygon            | MATIC | matic           | yes            | yes               |
| Solana             | SOL   | solana          | yes            | yes               |
| USDC (on Ethereum) | USDC  | usdc-eth        | yes            | yes               |
| USDC (on Polygon)  | USDC  | usdc-polygon    | yes            | yes               |


```js
const fundIrys = async () => {
	const irys = await getIrys();
	try {
		const fundTx = await irys.fund(irys.utils.toAtomic(0.05));
		console.log(`Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${irys.token}`);
	} catch (e) {
		console.log("Error uploading data ", e);
	}
};
```

### Uploading

#### Uploading data

```js
const uploadData = async () => {
	const irys = await getIrys();
	const dataToUpload = "hirys world.";
	try {
		const receipt = await irys.upload(dataToUpload);
		console.log(`Data uploaded ==> https://testnet-gateway.irys.xyz/${receipt.id}`);
	} catch (e) {
		console.log("Error uploading data ", e);
	}
};
```

#### Uploading a file

```js
const uploadFile = async () => {
	const irys = await getIrys();
	// Your file
	const fileToUpload = "./myImage.png";

	const tags = [{ name: "application-id", value: "MyNFTDrop" }];

	try {
		const receipt = await irys.uploadFile(fileToUpload, { tags: tags });
		console.log(`File uploaded ==> https://testnet-gateway.irys.xyz/${receipt.id}`);
	} catch (e) {
		console.log("Error uploading file ", e);
	}
};
```

#### Uploading a folder

You can upload a group of files as a single transaction from both the server and the browser.

> When uploading a folder files can be accessed either directly at
`https://testnet-gateway.irys.xyz/:transactionId` or `https://testnet-gateway.irys.xyz/:manifestId/:fileName`


```js
const uploadFolder = async () => {
	const irys = await getIrys();

	// Upload an entire folder
	const folderToUpload = "./my-images/"; // Path to folder
	try {
		const receipt = await irys.uploadFolder("./" + folderToUpload, {
			indexFile: "", // Optional index file (file the user will load when accessing the manifest)
			batchSize: 50, // Number of items to upload at once
			keepDeleted: false, // whether to keep now deleted items from previous uploads
		}); // Returns the manifest ID

		console.log(`Files uploaded. Manifest ID ${receipt.id}`);
	} catch (e) {
		console.log("Error uploading file ", e);
	}
};
```

### Downloading Data

Once data is uploaded, it becomes instantly accessible via our gateway. To download data, make a GET request as follows:

`https://testnet-gateway.irys.xyz/:transactionId`

Example:

`https://testnet-gateway.irys.xyz/CO9EpX0lekJEfXUOeXncUmMuG8eEp5WJHXl9U9yZUYA`

### 3rd party build tools

### Parcel

If using [Parcel](https://parceljs.org/), you will need to [manually enable package exports](https://parceljs.org/features/dependency-resolution/#package-exports) by adding the following to the `package.json` file in your project root directory.

```json
{
	"@parcel/resolver-default": {
		"packageExports": true
	}
}
```

## Support

If you have any questions or just want to brainstorm about how to integrate Irys into your project, reach out to us in [Discord](https://discord.gg/irys).
