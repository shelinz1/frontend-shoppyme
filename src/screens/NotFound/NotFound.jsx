import React from "react";
import { Link } from "react-router-dom";
import errorImage from "./something-lost.png";

export default function NotFound() {
  return (
    <div className="not-found">
      <img src={errorImage} alt="404 error" style={{ width: "20rem" }} />
      <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        Page not found
      </div>

      <Link className="ui button secondary" to="/">
        Go To Homepage
      </Link>
    </div>
  );
}
