import React, {useState} from "react";
import {HashRouter as Router} from "react-router-dom";

function NftCustomization() {
	let arr = JSON.parse(localStorage.getItem("collection"));

	const [collection, setCollection] = useState(arr);

	return (
		<Router>
			<div class="App App2">
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<div class="name">NFTour</div>
								<div class="wallet">
									<div className="acc-status">Connected:</div>
									<div className="acc-wallet">{localStorage.address}</div>
								</div>
							</div>

							<div class="pages">
								<div class="page-element active">Home</div>
								<div class="page-element">NFT Generator</div>
								<div class="page-element">NFT Chapter Constructor</div>
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
