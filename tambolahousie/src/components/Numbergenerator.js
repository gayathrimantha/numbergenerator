import React from "react";
import "../css/Numbergenerator.css";

const Numbergenerator = () => {
  const numbersArray = Array.from({ length: 90 }, (_, index) => index + 1);
  console.log(numbersArray);

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

        </div>
      </div>
    </div>
  );
};

export default Numbergenerator;
