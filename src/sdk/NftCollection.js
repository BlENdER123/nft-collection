import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";

import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";

import {signerKeys, TonClient, signerNone} from "@tonclient/core";

//contracts
import {DeployerColectionContract} from "./collection contracts/nftour/src/build/DeployerColectionContract.js";
import {NftRootContract} from "./collection contracts/nftour/src/build/NftRootContract.js";
import {CollectionRoot} from "./collection contracts/nftour/src/build/NftRootContract.js";
import {DEXRootContract} from "./test net contracts/DEXRoot.js";

import {DEXClientContract} from "./test net contracts/DEXClient.js";

TonClient.useBinaryLibrary(libWeb);

const client = new TonClient({network: {endpoints: ["net.ton.dev"]}});

async function getClientKeys(phrase) {
	//todo change with only pubkey returns
	let test = await client.crypto.mnemonic_derive_sign_keys({
		phrase,
		path: "m/44'/396'/0'/0/0",
		dictionary: 1,
		word_count: 12,
	});
	console.log(test);
	return test;
}

function NftCustomization() {
	let arr = JSON.parse(localStorage.getItem("collection"));

	const [collection, setCollection] = useState(arr);

	let dexrootAddr =
		"0:2f7e2b36f2033453488b0c7585dd3b0025cfc6eae1d2f377239dbe98735732c1";

	const zeroAddress =
		"0:0000000000000000000000000000000000000000000000000000000000000000";

	async function deployCollection() {
		// const clientAcc = new Account(DEXClientContract, {
		// 	address: localStorage.address,
		// 	signer: signerKeys(getClientKeys("build clay crush dolphin sadness inch trade mule notice differ any border")),
		// 	client,
		// });

		// console.log(clientAcc);

		const acc = new Account(DeployerColectionContract, {
			//address: localStorage.address,
			signer: signerKeys(
				getClientKeys(
					"build clay crush dolphin sadness inch trade mule notice differ any border",
				),
			),
			client,
		});

		try {
			// const {body} = await client.abi.encode_message_body({
			// 	abi: {type: "Contract", value: DataContract.abi},
			// 	signer: {type: "None"},
			// 	is_internal: true,
			// 	call_set: {
			// 		function_name: "withdrawDePoolPart",
			// 		input: {
			// 			amount: fixedAmount
			// 		},
			// 	},
			// });
			const res = await acc.run("deployColection", {
				addrOwner: localStorage.address,
				fees: 10,
				costMint: 149000,
			});
			console.log(res);
		} catch (e) {
			console.log(e);
		}

		// await dexrootAddr.run("deployColection", {
		// 	addrOwner: localStorage.address,
		// 	fees: 10,
		// 	costMint: 149000,
		// })

		// try {
		// 	const response = await acc.runLocal("deployColection", {
		// 		addrOwner: localStorage.address,
		// 		fees: 10,
		// 		costMint: 149000,
		// 	});
		// 	let value0 = response.decoded.output.value0;
		// 	console.log("value0", value0);
		// 	//return value0;
		// } catch (e) {
		// 	console.log("catch E", e);
		// 	//return e;
		// }

		// try {
		// 	const response = await acc.runLocal("getAddressColections", {});
		// 	let value0 = response.decoded.output.addreses;
		// 	console.log("value0", value0);
		// 	//return value0;
		// } catch (e) {
		// 	console.log("catch E", e);
		// 	//return e;
		// }

		// const accRoot = new Account(NftRootContract, {
		// 	address: dexrootAddr,
		// 	client,
		// });

		// await accRoot.deploy({
		// 	initFunctionName: "constructor",
		// 	initInput: {ownerAddr: zeroAddress},
		// })

		// try {
		// 	const response = await accRoot.runLocal("deployMetadata", {
		// 		name: "test",
		// 		description: "test",
		// 		dna: "test",
		// 		attributes: [
		// 			{_type: "test",
		// 			value: "string",
		// 			rarity: 5}
		// 		],
		// 		chunks: 5,
		// 		mimeType: "test"

		// 	});
		// 	let value0 = response.decoded.output.value0;
		// 	console.log("value0", value0);
		// 	//return value0;
		// } catch (e) {
		// 	console.log("catch E", e);
		// 	//return e;
		// }

		// const abi = {
		// 	type: 'Contract',
		// 	value: NftRootContract.abi
		// }

		// const params = {
		// 	send_events: false,
		// 	message_encode_params: {
		// 		address: dexrootAddr,
		// 		abi,
		// 		call_set: {
		// 			function_name: 'deployMetadata',
		// 			input: {
		// 				name: "test",
		// 				description: "test",
		// 				dna: "test",
		// 				attributes: [
		// 					{_type: "test",
		// 					value: "string",
		// 					rarity: 5}
		// 				],
		// 				chunks: 5,
		// 				mimeType: "test"
		// 			}
		// 		},
		// 		signer: signerNone(),
		// 	}
		// }

		// let response = await client.processing.process_message(params);
		// //console.log(1);
		// console.log(response);
		// console.log(`Сontract run transaction with output ${response.decoded.output}, ${response.transaction.id}`);
	}

	return (
		<Router>
			<div class="App App2">
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<a href="#/">
									<div class="name">NFTour</div>
								</a>
								{localStorage.address ? (
									<div class="wallet">
										<div className="acc-status">Connected:</div>
										<div className="acc-wallet">{localStorage.address}</div>
									</div>
								) : (
									""
								)}
							</div>

							<div class="pages">
								<a href="#/">
									<div class="page-element">Home</div>
								</a>
								<a href="#/load-nft">
									<div class="page-element active">NFT Generator</div>
								</a>
								<a href="#/collection-market">
									<div class="page-element">NFT Collection Market</div>
								</a>
								<div class="page-element">FAQ</div>
							</div>
						</div>
					</div>
				</div>

				<div class="collection">
					<div class="title">Your Collection</div>
					<div class="text">
						NFT art creator’s main goal is to invent, and using NFTour artists
					</div>

					<div class="button-1-square" onClick={deployCollection}>
						Deploy Collection
					</div>
					<div class="button-3-square">Save As</div>

					<div class="nft-collection">
						{collection.map((item) => {
							return (
								<div class="nft-element">
									<img src={item} />
								</div>
							);
						})}
					</div>
				</div>

				<div class="footer">
					<div class="container-header">
						<div class="footer-1">
							<div class="name">RADIANCETEAM</div>
							<div class="copyright">
								© 2021, radianceteam.com
								<br />
								Terms of Service
								<br />
								Privacy Policy
							</div>
						</div>
						<div class="footer-2">
							<div class="pages">
								<div class="page-element active">Home</div>
								<div class="page-element">App</div>
								<div class="page-element">FAQ</div>
								<div class="page-element">Twitter</div>
								<div class="page-element">Facebook</div>
							</div>
							<div class="email">
								<span>For corparation</span>
								<div class="text">info@radianceteam.com</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default NftCustomization;
