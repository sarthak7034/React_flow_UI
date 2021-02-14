import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

import * as Actions from '../actions';

export default memo(({ data }) => {
  return (
    <div onClick={(e) => Actions.handleExitChange(e)}>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
    <div style={{border: "2px solid black"}}>
        <p> Custom Color Picker Node: <strong>{data.color}</strong> </p>
       <p> 
           <input
            className="nodrag"
            type="text"
            onKeyDown={ e => {
                if (e.key === "Enter")
                    Actions.handleEntryChange(e)
            }}
            defaultValue={data.color}
        /> 
      </p>
    </div>
     
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
      />
    </div>
  );
});