import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="page-404">
      <h1>404! Page Not Found</h1>
      <p>
        go back to the home page! <Link to="/">Click Here</Link>
      </p>
    </div>
  );
};

export default Notfound;
