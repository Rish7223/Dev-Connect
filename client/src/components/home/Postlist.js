import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

// string shorting function
function shorten(str, maxLen, separator = " ") {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

const Postlist = ({ posts }) => {
  return (
    posts.length > 0 &&
    posts.map((post) => (
      <div className="post-card" key={post._id}>
        <div className="image">
          <img src={post.postIMG} alt="post-pic" />
        </div>
        <div className="post-info">
          <Link to={`/post/${post._id}`}>
            {post.title.length < 40 ? (
              <h2 className="h-mid">{post.title}</h2>
            ) : (
              <h2 className="h-sm">{post.title}</h2>
            )}
          </Link>
          <p>{shorten(post.description.join(), 130, " ")}...</p>
          <div className="author-data">
            <div className="author">
              <h3>{post.author}</h3>
              <p>{moment(post.date).format("DD-MMM-YYYY")}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default Postlist;
