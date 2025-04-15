import { useState, useEffect } from 'react';
import './ColorGuess.css';

function ColorGuess() {
  // state stores the 3 colours
  const [colors, setColors] = useState([]);
  // tracks target colour
  const [targetIndex, setTargetIndex] = useState(0);
  // this show is you correct ot not
  const [result, setResult] = useState('');
  
  // random makes hex colour
  const generateRandomColor = () => {
    // random value for r g b
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // changes to hex
    const hexColor = '#' + 
      r.toString(16).padStart(2,) + 
      g.toString(16).padStart(2,) + 
      b.toString(16).padStart(2,);
    
    return hexColor;
  };
  
  // function for new game
  const setupGame = () => {
    // genereate 3 random colour
    const newColors = [
      generateRandomColor(),
      generateRandomColor(),
      generateRandomColor()
    ];
    
    // pick between 0 1 2
    const newTargetIndex = Math.floor(Math.random() * 3);
    
    // update state
    setColors(newColors);
    setTargetIndex(newTargetIndex);
    setResult('');
  };
  
  // for clicking colour
  const handleColorClick = (index) => {
    if (index === targetIndex) {
      setResult('Correct!');
    } else {
      setResult('Incorrect!');
    }
  };
  
  // init guess game
  useEffect(() => {
    setupGame();
  }, []);
  
  return (
    <div className="color-guess">
      <h1>Colour Guessing Game</h1>
      
      <div className="color-swatches">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(index)}
          />
        ))}
      </div>
      
      <div className="game-info">
        <p className="target-color">⬆️ Guess colour: {colors[targetIndex]} ⬆️</p>
        
        {result && <p className={`result ${result.toLowerCase()}`}>{result}</p>}
        
        <button className="reset-button" onClick={setupGame}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default ColorGuess;