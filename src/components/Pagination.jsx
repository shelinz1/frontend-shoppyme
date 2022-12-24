import React from "react";
import { Link } from "react-router-dom";

function Pagination({ page, pages, keyword = "" }) {
  return (
    pages > 1 && (
      <ul className="pagination">
        {[...Array(pages).keys()].map((pages) => (
          <li key={pages + 1}>
            <Link
              className={`${
                pages + 1 === page ? "ui button primary" : "ui button secondary"
              }`}
              to={
                keyword
                  ? `/search/${keyword}/page/${pages + 1}`
                  : `/page/${pages + 1}`
              }
            >
              {pages + 1}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
}

export default Pagination;
