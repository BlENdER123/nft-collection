import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";

import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";

import {signerKeys, TonClient, signerNone} from "@tonclient/core";

//contracts
// import {DeployerColectionContract} from "./collection contracts/nftour/src/build/DeployerColectionContract.js";
// import {NftRootContract} from "./collection contracts/nftour/src/build/NftRootContract.js";
// import {CollectionRoot} from "./collection contracts/nftour/src/build/NftRootContract.js";
// import {StorageContract} from "./collection contracts/nftour/src/build/StorageContract.js";
import {DEXRootContract} from "./test net contracts/DEXRoot.js";

import {DEXClientContract} from "./test net contracts/DEXClient.js";
import {Collections} from "@material-ui/icons";

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

function base64ToHex(str) {
	const raw = atob(str);
	let result = "";
	for (let i = 0; i < raw.length; i++) {
		const hex = raw.charCodeAt(i).toString(16);
		result += hex.length === 2 ? hex : "0" + hex;
	}
	return result.toUpperCase();
}

function NftCustomization() {
	let arr = JSON.parse(localStorage.getItem("collection"));

	const [collection, setCollection] = useState(arr);

	let dexrootAddr =
		"0:6ee64ce9cb26f03ff4d5779dd97c27af8a66667ff8d88b3054e15d31572b3a34";

	const zeroAddress =
		"0:0000000000000000000000000000000000000000000000000000000000000000";

	async function deployCollection() {
		const acc = new Account(DeployerColectionContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		const clientAcc = new Account(DEXClientContract, {
			address: localStorage.address,
			signer: signerKeys(
				await getClientKeys(
					"build clay crush dolphin sadness inch trade mule notice differ any border",
				),
			),
			client,
		});

		try {
			const {body} = await client.abi.encode_message_body({
				abi: {type: "Contract", value: DeployerColectionContract.abi},
				signer: {type: "None"},
				is_internal: true,
				call_set: {
					function_name: "deployColection",
					input: {
						addrOwner: localStorage.address,
						fees: 10,
						costMint: 149000,
					},
				},
			});

			const res = await clientAcc.run("sendTransaction", {
				dest: dexrootAddr,
				value: 1500000000,
				bounce: true,
				flags: 3,
				payload: body,
			});
			console.log(res);
		} catch (e) {
			console.log(e);
		}

		//

		let collectionAddr;

		try {
			const response = await acc.runLocal("getAddressColections", {});
			let value0 = response.decoded.output.addreses;
			collectionAddr = value0[value0.length - 1];
			console.log("value0", value0);
			//return value0;
		} catch (e) {
			console.log("catch E", e);
			//return e;
		}

		//

		console.log(collectionAddr);
		for (let i = 0; i < collection.length; i++) {
			let temp = collection[i].replace(/^data:image\/(png|jpg);base64,/, "");

			//const pattern = new RegExp(".{1," + 10000 + "}", "g");
			let result = temp;

			try {
				const {body} = await client.abi.encode_message_body({
					abi: {type: "Contract", value: NftRootContract.abi},
					signer: {type: "None"},
					is_internal: true,
					call_set: {
						function_name: "deployMetadata",
						input: {
							name: "test",
							description: "test",
							dna: "test",
							attributes: [{_type: "test", value: "string", rarity: 5}],
							chunks: result.length,
							mimeType: "test",
						},
					},
				});

				console.log(collectionAddr, body);

				const res = await clientAcc.run("sendTransaction", {
					dest: collectionAddr,
					value: 2600000000,
					bounce: true,
					flags: 3,
					payload: body,
				});
				console.log(res);
			} catch (e) {
				console.log(e);
			}

			//

			const clientAcc1 = new Account(NftRootContract, {
				address: collectionAddr,
				signer: signerNone(),
				client,
			});

			let imgAddr;
			try {
				const response = await clientAcc1.runLocal("resolveStorage", {
					addrRoot: collectionAddr,
					id: 0,
					addrAuthor: localStorage.address,
				});

				imgAddr = response;
				console.log("value0", imgAddr);

				//return value0;
			} catch (e) {
				console.log("catch E", e);
				//return e;
			}

			const clientStorage = new Account(StorageContract, {
				address: imgAddr,
				signer: signerNone(),
				client,
			});

			for (let j = 0; j < result.length; j++) {
				console.log(typeof TonClient.toHex(result[j]));
				try {
					const {body} = await client.abi.encode_message_body({
						abi: {type: "Contract", value: StorageContract.abi},
						signer: {type: "None"},
						is_internal: true,
						call_set: {
							function_name: "fillContent",
							input: {
								chankNumber: j,
								part: TonClient.toHex(result[j]),
							},
						},
					});

					const res = await clientAcc.run("sendTransaction", {
						dest: imgAddr,
						value: 500000000,
						bounce: true,
						flags: 3,
						payload: body,
					});
					console.log(res);
				} catch (e) {
					console.log(e);
				}
			}

			try {
				const response = await clientStorage.runLocal("getInfo");
				console.log(response);
				//return value0;
			} catch (e) {
				console.log("catch E", e);
				//return e;
			}
		}

		// try {
		// 	const response = await clientAcc1.runLocal("resolveMetadata", {
		// 		addrRoot: '0:0774b502850fa0ed104a4ed805914782552651c98d45f36272eecf4ac5e67f36',
		// 		id: 0
		// 	});

		// 	let value0 = response;
		// 	console.log("value0", value0);
		// 	//return value0;
		// } catch (e) {
		// 	console.log("catch E", e);
		// 	//return e;
		// }

		// try {
		// 	const response = await clientAcc1.runLocal("getInfo", {});
		// 	let value0 = response;
		// 	console.log("value0", value0);
		// } catch (e) {
		// 	console.log("catch E", e);
		// }

		// let response = await client.processing.process_message(params);
		// //console.log(1);
		// console.log(response);
		// console.log(`Сontract run transaction with output ${response.decoded.output}, ${response.transaction.id}`);
	}

	function test() {
		let bs64;

		var img = new Image();
		img.crossOrigin = "Anonymous";
		img.onload = function () {
			var canvas = document.createElement("CANVAS");
			var ctx = canvas.getContext("2d");
			var dataURL;
			canvas.height = this.naturalHeight;
			canvas.width = this.naturalWidth;
			ctx.drawImage(this, 0, 0);
			dataURL = canvas.toDataURL(
				"https://gateway.pinata.cloud/ipfs/Qmbvi4pcWt22YpopW6XfPxtxi4jftABQpoaoqTLtWaZftg",
			);
			console.log(dataURL);
			bs64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
			//callback(dataURL);

			const pattern = new RegExp(".{1," + 15000 + "}", "g");
			let res = bs64.match(pattern);

			console.log(res);
		};
		img.src =
			"https://gateway.pinata.cloud/ipfs/Qmbvi4pcWt22YpopW6XfPxtxi4jftABQpoaoqTLtWaZftg";
		if (img.complete || img.complete === undefined) {
			img.src =
				"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			img.src =
				"https://gateway.pinata.cloud/ipfs/Qmbvi4pcWt22YpopW6XfPxtxi4jftABQpoaoqTLtWaZftg";
		}
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

					<div class="button-1-square">Deploy Collection</div>

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
								<a href="https://t.me/DefiSpacecom">
									<div class="page-element">Telegram</div>
								</a>
							</div>
							<div class="email">
								<span>For corporation</span>
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
