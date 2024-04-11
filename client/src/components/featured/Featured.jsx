import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/listings?search=${input}`);
  };
  return (
    <div className="featured" style={{background:"#4f5052"}}>
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>Artist</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput" style={{width:"100%"}}>
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                style={{width:"100%"}}
                placeholder='Try "Design a logo"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Video Editing</button>
            <button>Drawing & Illustration</button>
            <button>Photography</button>
            <button>3D Modeling & Rendering</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;