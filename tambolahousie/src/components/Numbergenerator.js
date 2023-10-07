import React, { useState, useEffect } from "react";
import "../css/Numbergenerator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Numbergenerator = () => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [numbersArray, setNumbersArray] = useState(
    Array.from({ length: 90 }, (_, index) => index + 1)
  );
  const [numbersArrayNEW, setNumbersArrayNEW] = useState(
    Array.from({ length: 90 }, (_, index) => index + 1)
  );
  const [generatedNumbers, setGeneratedNumbers] = useState(new Set());
  const [currentNumber, setCurrentNumber] = useState(null);

  const handleMouseEnter = () => {
    setIsIconHovered(true);
  };

  const handleMouseLeave = () => {
    setIsIconHovered(false);
  };

  const generateRandomNumber = () => {
    if (numbersArray.length === 0) {
      // All numbers have been generated
      setCurrentNumber(null);
    } else {
      const randomIndex = Math.floor(Math.random() * numbersArray.length);
      const selectedNumber = numbersArray[randomIndex];
      const updatedNumbersArray = [...numbersArray];
      updatedNumbersArray.splice(randomIndex, 1);

      const updatedGeneratedNumbers = new Set(generatedNumbers);
      updatedGeneratedNumbers.add(selectedNumber);

      setCurrentNumber(selectedNumber);
      setNumbersArray(updatedNumbersArray);
      setGeneratedNumbers(updatedGeneratedNumbers);

      // Save generatedNumbers to localStorage
      localStorage.setItem(
        "generatedNumbers",
        JSON.stringify(Array.from(updatedGeneratedNumbers))
      );
    }
  };

  // Retrieve generatedNumbers from localStorage on component mount
  useEffect(() => {
    const savedGeneratedNumbers = localStorage.getItem("generatedNumbers");
    if (savedGeneratedNumbers) {
      const parsedGeneratedNumbers = new Set(JSON.parse(savedGeneratedNumbers));
      setGeneratedNumbers(parsedGeneratedNumbers);
    }
  }, []);

  const handleNewGame = () => {
    // Reset the generatedNumbers set and currentNumber
    setGeneratedNumbers(new Set());
    setCurrentNumber(null);

    // Reset numbersArray to contain all numbers
    setNumbersArray(Array.from({ length: 90 }, (_, index) => index + 1));

    // Clear the generatedNumbers from localStorage
    localStorage.removeItem("generatedNumbers");
  };

  return (
    <div className="mainContainer">
      <div className="headerTitle">
        <div> NUMBER GENERATOR FOR TAMBOLA, HOUSIE AND BINGO</div>
      </div>
      <div className="numbersDivParent">
        <div className="numbersDiv">
          <div className="numbersDisplay">
            {numbersArrayNEW.map((number) => (
              <div
                className={
                  generatedNumbers.has(number)
                    ? "boxStyleGenerated"
                    : "boxStyle"
                }
                key={number}
              >
                <div
                  className={
                    generatedNumbers.has(number)
                      ? "numberStyleGenerated"
                      : "numberStyle"
                  }
                >
                  {number}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={isIconHovered ? "hoveredIcon" : "playButton"}
          onClick={generateRandomNumber}
        >
          <FontAwesomeIcon
            icon={faPlay}
            className={isIconHovered ? "hoveredIconStyle" : "iconStyle"}
            size="2xl"
          />
        </div>
        <div
          className={isIconHovered ? "hoveredPlayTextStyle" : "playTextStyle"}
        >
          PLAY
        </div>
        <div onClick={handleNewGame} className="newGameButton">
          <div className="newGameText">New Game</div>
        </div>
        {currentNumber && (
          <div className="generatedNumber">
            <div className="numberStyleCurrent"> {currentNumber}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Numbergenerator;
