import React from "react";
import { useReach } from "../../hooks/useReach";

const ConnectAccount = () => {
	const { connecAccount } = useReach();
	return (
		<div className='Sale'> 
			Please wait while we connect to your account.		
			</div>
	);
};

export default ConnectAccount;