import React, { useState } from "react";
import "../css/Numbergenerator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlay } from "@fortawesome/free-solid-svg-icons";

const Numbergenerator = () => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const numbersArray = Array.from({ length: 90 }, (_, index) => index + 1);
  console.log(numbersArray);

  const handleMouseEnter = () => {
    setIsIconHovered(true);
  };

  const handleMouseLeave = () => {
    setIsIconHovered(false);
  };

  return (
    <div className="mainContainer">
      <div className="headerTitle">
        NUMBER GENERATOR FOR TAMBOLA, HOUSIE AND BINGO
      </div>
      <div className="numbersDivParent">
        <div className="numbersDiv">
          <div className="numbersDisplay">
            {numbersArray.map((number) => (
              <div className="boxStyle">
                <div className="numberStyle">{number}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="settingsContent">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={isIconHovered ? "hoveredIcon" : "playButton"}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className={isIconHovered ? "hoveredIconStyle" : "iconStyle"}
              size="2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numbergenerator;
