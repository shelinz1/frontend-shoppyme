import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <div className="search">
      <form
        className="ui form"
        onSubmit={handleSubmit}
        style={{ display: "flex" }}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Search products"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="field" style={{ marginLeft: "0.5rem" }}>
          <button className="ui button secondary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchProducts;
