import React from "react";

const Wrapper = () => {
	const { content } = useContext(Context);
	return (
	  <div className='background-container'>
		<div className='stars'>
		  <div className='twinkling'>
			<img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt=""></img>
			<div className='clouds'>
			  <div className='App'>
				<header className='App-header' id='root'>
				  <img src={logo} className='App-logo' alt='logo'/>
				  <h2>NFT Auction</h2>
				  {content}
				</header>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	);
  }
  
  export default Wrapper;