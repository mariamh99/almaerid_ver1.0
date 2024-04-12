import React from "react";
import "./Slide.scss";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
          {children}

    </div>
  );
};

export default Slide;