import React, {useState} from "react";
import {HashRouter as Router, Redirect} from "react-router-dom";
//import {main_screen_bg} from "../sdk/img/screenbg1.png"

function GettingStarted() {
	const [curentMode, setCurentMode] = useState(0);

	const [redirect, setRedirect] = useState([false, false]);

	function next() {
		let temp = [];
		for (let i = 0; i < redirect.length; i++) {
			let tempVal = redirect[i];
			if (i == curentMode) {
				tempVal = true;
			} else {
				tempVal = false;
			}
			temp.push(tempVal);
		}
		setRedirect(temp);
	}

	return (
		<Router>
			<div className="App2">
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
									<div class="page-element">NFT Collection Market</div>
								</a>
								<div class="page-element">FAQ</div>
							</div>
						</div>
					</div>
				</div>

				<div class="start-screen">
					<div class="container-header">
						<div class="content-1">
							<div class="title">Getting Started</div>
							<div class="text">Select layout type</div>
							<div class="modes">
								<div
									className={
										curentMode == 0 ? "mode-generator active" : "mode-generator"
									}
									onClick={() => setCurentMode(0)}
								>
									<div class="img"></div>

									<span>NFT Generator</span>
								</div>
								<div
									className={
										curentMode == 1
											? "mode-constructor active"
											: "mode-constructor"
									}
									onClick={() => setCurentMode(1)}
								>
									{/* <div class="soon">Coming Soon</div> */}
									<div class="img"></div>
									<div class="break"></div>
									<span>NFT Collection Market</span>
								</div>
							</div>
							<div onClick={next} class="button-1-square">
								Next
							</div>
							<div class="button-3-square">
								Not sure where to start? Check out our intro video here.
							</div>
						</div>
						<div class="content-2">
							<div class="title">How it work?</div>
							<div class="text">Small documentation on service functions</div>
							<div class="text">
								Phasellus condimentum suscipit metus vel mattis. Ut vulputate
								tincidunt odio. Nam odio augue, molestie id rutrum et, cursus id
								libero. Quisque nulla dolor, condimentum quis posuere et, mattis
								quis sapien. Donec mollis.
								<br />
								<br />
								Fusce venenatis odio id pharetra vulputate. Phasellus dolor
								lacus, condimentum at bibendum vel, laoreet id arcu. Phasellus
								lobortis luctus semper. Fusce faucibus dolor eget nulla
								venenatis, eget porttitor nibh finibus. Praesent rhoncus erat et
								aliquet suscipit. Nam sed bibendum arcu, quis tristique tellus.
								<br />
								<br />
								Fusce venenatis odio id pharetra vulputate. Phasellus dolor
								lacus, condimentum at bibendum vel, laoreet id arcu. Phasellus
								lobortis luctus semper. Fusce faucibus dolor eget nulla
								venenatis, eget porttitor nibh finibus. Praesent rhoncus erat et
								aliquet suscipit. Nam sed bibendum arcu, quis tristique tellus.
							</div>
						</div>
					</div>
				</div>

				{redirect[0] ? <Redirect to="/load-nft" /> : ""}
				{redirect[1] ? <Redirect to="/collection-market" /> : ""}

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

export default GettingStarted;
