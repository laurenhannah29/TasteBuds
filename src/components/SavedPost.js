import React from 'react';

export function SavedPost(props) {
  return (
    <p>
      <li>{props.image}</li>
      <li>{props.caption}</li>
    </p>
  );
}
