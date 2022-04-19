import React from "react";
import Data from "./Data";

const FilterButtons = ({ filterPost, setPost, blogPosts }) => {
  return (
    <>
      <div>
        {blogPosts.map((value, id) => {
          return (
            <button
              onClick={() => filterPost(value)}
              key={id}
            >
              {value}
            </button>
          );
        })}
        <button
          onClick={() => setPost(Data)}
        >
          All
        </button>

      </div>
    </>
  );
};

export default FilterButtons;