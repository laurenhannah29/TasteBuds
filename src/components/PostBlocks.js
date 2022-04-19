import React from "react";

const PostBlocks = ({ post }) => {
  return (
    <>
      <div>
        <div>
          {post.map((value) => {
            return (
              <div
                key={value.id}
              >
                <div>
                  <img src={value.image} alt="post" />
                </div>
                <div>
                  <div>
                    <b>{value.title}</b>
                  </div>
                  <div>{value.caption}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostBlocks;