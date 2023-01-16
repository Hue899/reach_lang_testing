import React, { useState } from "react";
import { useReach } from "../../hooks/useReach";

const Deploy = ({parent, standardUnit}) => {
    return(
      <div className="Sale">
        <br />
        <button
          onClick={() => parent.deploy()}
        >Create and deploy</button>
      </div>
    );
  }
  
  export default Deploy;