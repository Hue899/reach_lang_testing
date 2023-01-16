import React from 'react';

const SetInfo = ({parent, defaultMin, standardUnit}) => {
    const [min, setMin] = useState(defaultMin);
    return(
      <div className='Sale'>
        Enter Minimum Bid
        <br />
        <input 
          type='number'
          placeholder={defaultMin}
          onChange={(e) => setMin(e.currentTarget.value)}
        /> {standardUnit}
        <br />
        <button className='setinfo'
          onClick={() => parent.setMin(min)}
        >Set Min Bid</button>
      </div>
    )
  }

export default SetInfo
  