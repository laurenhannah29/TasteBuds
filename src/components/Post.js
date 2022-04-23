import React from 'react';

export function Post(props) {
  return (
    <div>
      <input value={props.image} />
      <input value={props.caption} />
    </div>
  );
}
