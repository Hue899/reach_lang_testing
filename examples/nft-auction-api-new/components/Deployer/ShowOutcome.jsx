import React from 'react';

const ShowOutcome = ({winAdd, highBid, standardUnit}) => {
    return(
      <div className="Sale">
        <h5>Winning Address: <br/> {winAdd}</h5>
        <h5>Winning Bid: <br/>{highBid} {standardUnit}S</h5>
      </div>
    );
  }

export default ShowOutcome
