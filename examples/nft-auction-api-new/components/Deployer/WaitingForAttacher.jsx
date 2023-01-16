import React from "react";
import { useReach } from "../../hooks/useReach";

 const WaitingForAttacher = (props) => {
    const {ctcInfoStr, amt} = props;
    const {ready} = props || 'false';
    const [buttonText, setButtonText] = useState('Copy Contract Info');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const copyToClipboard = async (button) => {
      navigator.clipboard.writeText(ctcInfoStr);
      setButtonText('Copied');
      setButtonDisabled(true);
      await sleep(1000);
      setButtonText('Copy Contract Info');
      setButtonDisabled(false);
    }

    return (
      <div className="Game">
        Auction Ready: {ready}
        <br />
        Current bid: {amt}
        <br />
        <button
          onClick={(e) => {
            copyToClipboard(ctcInfoStr)
          }}
        >{buttonText}</button>
      </div>
    );
  }
  export default WaitingForAttacher;