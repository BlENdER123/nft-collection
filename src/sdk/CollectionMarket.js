import React, {useState} from "react";
import {connect} from "react-redux";
import {HashRouter as Router} from "react-router-dom";
//import {main_screen_bg} from "../sdk/img/screenbg1.png"
import ConnectWalletPage from "./ConnectWalletPage";

function CollectionMarket() {
	const [connectWal, setConnect] = useState(false);

	return (
		<Router>
			<div className={connectWal ? "error-bg" : "hide"}></div>
			<div className={connectWal ? "App-error" : "App App2"}>
				<div className="header header2">
					<div className="container-header">
						<div className="acc-info">
							<div class="acc-info1">
								<div class="name">NFTour</div>
								{false ? (
									<div class="wallet">
										<div className="acc-status">Connected:</div>
										<div className="acc-wallet">{localStorage.address}</div>
									</div>
								) : (
									<div class="wallet">
										<div
											class="button-1-square"
											onClick={() => setConnect(true)}
										>
											Connect
										</div>
									</div>
								)}
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

				<div class="collections">
					<div class="collection">
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

export default CollectionMarket;
