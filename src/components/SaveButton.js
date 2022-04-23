import React from 'react';

export function SaveButton(props) {
  return (
    <div>
      <button value={props.value} onClick={props.onClick}>Save</button>
    </div>
  );
}
