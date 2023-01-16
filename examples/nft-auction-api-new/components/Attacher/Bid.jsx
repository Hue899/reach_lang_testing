import React from "react";

const Bid = ({standardUnit, parent, mBid, nId, cBid}) => {
    const [bid, setBid] = useState(0);
    const [disabled, setDisabled] = useState(false);
    return (
      <div className="Sale" >
        <img className="nftimg" src={logo}></img> 
        <br /> ASA ID: {nId}
        <br /> Min bid: {mBid} {standardUnit}S
        <br /> Current Bid: {cBid} {standardUnit}S
        <br />
        <input 
          type='number'
          placeholder={cBid}
          onChange={(e) => setBid(e.currentTarget.value)}
        /> {standardUnit}S
        <br />
        <button
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            parent.setBid(bid);
          }}
        >Bid</button>
      </div>
    );
  }

export default Bid;