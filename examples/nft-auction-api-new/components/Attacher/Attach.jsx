import React, { useState } from "react";
import { useReach } from "../../hooks/useReach";

const Attach = () => {
	const [ctcInfoStr, setCtcInfoStr] = useState("");
	const { attach } = useReach();
	return (
		<div>
			Please paste the contract info to bid on:
			<br />
			<textarea
				spellCheck='false'
				className='ContractInfo'
				onChange={(e) => setCtcInfoStr(e.currentTarget.value)}
				placeholder='Enter contract info'
			/>
			<br />
			<button disabled={!ctcInfoStr} onClick={() => attach(ctcInfoStr)}
            >Show Auction Info</button>
		</div>
	);
};

export default Attach;