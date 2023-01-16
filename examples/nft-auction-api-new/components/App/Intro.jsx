import React from "react";

const Intro = ({ parent }) => {
	return (
		<div>
			<div className='Sale'>
				<button onClick={() => parent.start()}
					>Get Started</button>
			</div>
		</div>
	);
};

export default Intro;