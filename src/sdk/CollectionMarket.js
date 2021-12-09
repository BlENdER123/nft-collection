import React, {useState} from "react";
import {connect} from "react-redux";
import {HashRouter as Router} from "react-router-dom";
//import {main_screen_bg} from "../sdk/img/screenbg1.png"
import ConnectWalletPage from "./ConnectWalletPage";

import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";

import {signerKeys, TonClient, signerNone} from "@tonclient/core";

import {DeployerColectionContract} from "./collection contracts/nftour/src/ton-packages/DeployerColectionContract.js";
import {NftRootContract} from "./collection contracts/nftour/src/ton-packages/NftRootContract.js";
import {Metadata} from "./collection contracts/New folder/nftour/src/ton-packages/MetadataContract.js";

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

function CollectionMarket() {
	const [connectWal, setConnect] = useState(false);

	const [mintNftData, setMintNftData] = useState({
		hidden: true,
	});

	let dexrootAddr =
		"0:23a93d1d9b7ab80a9b17fbb8bb1e3186f59ef4af782a23c2a4756f0e90f2c8b4";

	const zeroAddress =
		"0:0000000000000000000000000000000000000000000000000000000000000000";

	let [collections, setCollections] = useState([]);

	async function getCollections() {
		let tempCollection = [];
		const acc = new Account(DeployerColectionContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		let collectionAddrs;

		try {
			const response = await acc.runLocal("getAddressColections", {});
			let value0 = response.decoded.output.addreses;
			collectionAddrs = value0;
			console.log("value0", value0);
			//return value0;
		} catch (e) {
			console.log("catch E", e);
			//return e;
		}

		for (let i = 0; i < collectionAddrs.length; i++) {
			const nftRootAcc = new Account(NftRootContract, {
				address: collectionAddrs[i],
				signer: signerNone(),
				client,
			});

			try {
				const response = await nftRootAcc.runLocal("getInfo", {});

				let tempres = response.decoded.output;

				tempCollection.push({
					name: tempres.name,
					description: tempres.description,
				});
				//return value0;
			} catch (e) {
				console.log("catch E", e);
				//return e;
			}
		}

		console.log(tempCollection);

		setCollections(tempCollection);
	}

	return (
		<Router>
			<div className={!mintNftData.hidden ? "error-bg" : "hide"}></div>
			<div className={!mintNftData.hidden ? "App-error" : "App App2"}>
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
									<div class="page-element">NFT Generator</div>
								</a>
								<a href="#/collection-market">
									<div class="page-element active">NFT Collection Market</div>
								</a>
								<div class="page-element">FAQ</div>
							</div>
						</div>
					</div>
				</div>

				<div
					className={
						mintNftData.hidden ? "hide" : "modal-connect modal-connect-first"
					}
				>
					<button
						className="close"
						onClick={() => setMintNftData({hidden: true})}
					>
						<span></span>
						<span></span>
					</button>
					<div class="title">Robots Collection</div>
					<div class="mint owner">
						Owner: <span>0:65eb...fe7b</span>{" "}
					</div>
					<div class="mint price">
						Price: <span>149</span>{" "}
					</div>
					<div class="mint royalty">
						Royalty for Author <span>15%</span>{" "}
					</div>
					<div class="button-1-square">Buy & Open Pack</div>
				</div>

				<div class="collections">
					{/* <div class="collection">
						<div class="img"></div>
						<div class="content">
							<div class="name">Robot #23245</div>
							<div class="rank">
								<span>Rank:</span>100
							</div>
							<div class="price">
								<span>Price:</span>149000.00
							</div>
							<div class="price-quality">
								<span>Price quality:</span>50%
							</div>
							<div class="button-1-square">Buy & Open pack:</div>
						</div>
					</div> */}
					{collections?.length > 0 ? (
						collections.map((item, index) => {
							return (
								<div class="collection">
									<div class="content">
										<div class="name">{item.name}</div>
										<div class="description">
											<span>Description:</span>
											{item.description}
										</div>
										<div class="rank">
											<span>Rank:</span>100
										</div>
										<div class="price">
											<span>Price:</span>149000.00
										</div>
										<div class="price-quality">
											<span>Price quality:</span>50%
										</div>
										<div
											class="button-1-square"
											onClick={() => setMintNftData({hidden: false})}
										>
											Buy & Open pack:
										</div>
									</div>
								</div>
							);
						})
					) : (
						<button className="button-1-square" onClick={getCollections}>
							Load Collections
						</button>
					)}
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

export default CollectionMarket;
