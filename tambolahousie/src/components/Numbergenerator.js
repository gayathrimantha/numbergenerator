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
  const [removedNumbersArray, setRemovedNumbersArray] = useState([]);
  const [removedNumbersIndex, setRemovedNumbersIndex] = useState(0);

  useEffect(() => {
    // Whenever removedNumbersArray changes, reset the index
    setRemovedNumbersIndex(0);
  }, [removedNumbersArray]);

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

      function convertNumberToSpeechFormat(number) {
        if (number >= 10 && number <= 90) {
          const tensDigit = Math.floor(number / 10);
          const onesDigit = number % 10;

          return [tensDigit, onesDigit, number].join(",");
        } else {
          return ["single number", number].join(",");
        }
      }
      const formattedNumber = convertNumberToSpeechFormat(selectedNumber);

      const msg = new SpeechSynthesisUtterance();
      msg.text = formattedNumber;
      msg.rate = 0.8;
      window.speechSynthesis.speak(msg);
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

  const handleSpacebarPress = (event) => {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      // Call your function here
      generateRandomNumber();
    }
  };

  return (
    <>
      <div
        className="mainContainer"
        onKeyDown={handleSpacebarPress}
        tabIndex={0}
      >
        <div className="headerTitle">
          <div className="headerTitleText">
            NUMBER GENERATOR FOR TAMBOLA, HOUSIE AND BINGO
          </div>
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
            GENERATE NUMBER
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
      <div className="generatedNumberArray">
        {Array.from(generatedNumbers).join(", ")}
      </div>
    </>
  );
};

export default Numbergenerator;
