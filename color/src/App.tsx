import { useState, useEffect } from "react"
import "./App.css"
import "./color.scss"

function App() {
  return <ColorGame />
}

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const ColorGame: React.FC = () => {
  const [targetColor, setTargetColor] = useState<string>("")
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    newGame()
  }, [])

  const newGame = () => {
    const correctColor = generateRandomColor()
    const colorOptions = [correctColor]

    while (colorOptions.length < 4) {
      const newColor = generateRandomColor()
      if (!colorOptions.includes(newColor)) {
        colorOptions.push(newColor)
      }
    }

    setTargetColor(correctColor)
    setOptions(shuffleArray(colorOptions))
  }

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const handleGuess = (selectedColor: string) => {
    if (selectedColor === targetColor) {
      setScore(score + 1)
      newGame()
    }
  }

  return (
    <div className='container'>
      <h1>Color Guessing Game</h1>
      <div className='colorBox' style={{ backgroundColor: targetColor }}></div>
      <p>Guess the color:</p>
      <div className='options'>
        {options.map((color) => (
          <button key={color} className='option' onClick={() => handleGuess(color)}>
            {color}
          </button>
        ))}
      </div>
      <p className='score'>Score: {score}</p>
      <button className='newGame' onClick={newGame}>
        New Game
      </button>
    </div>
  )
}

export default App
