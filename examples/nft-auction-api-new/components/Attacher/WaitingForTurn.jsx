import React, { useState } from "react";

const WaitingForTurn = ({ parent }) => {
    const [disabled, setDisabled] = useState(false);
	return (
		<div className='Sale'>
			Waiting for the results...
			<br />
			Consider a higher bid...
            <br />
          <button>
            disabled={disabled}
            onClick={() => {
                setDisabled(true)
                parent.bidFunc()     
            }}
          > Send it!</button>
		</div>
	);
}

export default WaitingForTurn;
