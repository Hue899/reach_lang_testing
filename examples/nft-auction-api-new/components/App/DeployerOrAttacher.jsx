import React from "react";
import { useReach } from "../../hooks/useReach";

const DeployerOrAttacher = () => {
	const { selectDeployer, selectAttacher } = useReach();
	return (
		<div>
			Please select a role:
			<br />
			<p>
				<button onClick={() => selectCreator()}>Create + Sell an NFT</button>
			</p>
			<p>
				<button onClick={() => selectBidder()}>Bid on an NFT</button>
			</p>
		</div>
	);

};

export default DeployerOrAttacher;
