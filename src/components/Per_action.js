import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import initialElements from './initial-elements';


export default  memo(({ data }) => {
    return (
      <>
        <Handle
          type="target"
          id = "1"
          onConnect={(params) => console.log('handle onConnect', params)}
        />
        <input
          id="1"
          type="input"
          onChange={data.console.log('GG')}
          defaultValue={data.input}
        />
  
      </>
    );
  });

 