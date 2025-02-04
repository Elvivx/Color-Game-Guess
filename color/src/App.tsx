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
  const [power, setPower] = useState<string[]>(["⚡", "⚡", "⚡", "⚡", "⚡"])
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    play()
    // setPower(["⚡", "⚡", "⚡", "⚡", "⚡"])
    // let i = "⚡"
    // console.log(typeof i)
  }, [])

  const play = () => {
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
      play()
    } else {
      // power.pop()
      setPower(power.pop())
    }
  }

  const newGame = () => {
    setScore(0)
  }

  return (
    <div className='container'>
      <h1>Color Guessing Game</h1>
      <div className='colorBox' style={{ backgroundColor: targetColor }}></div>
      <p>Guess the color:</p>
      <div className='options'>
        {options.map((color) => (
          <button key={color} className='option' onClick={() => handleGuess(color)} style={{ background: color }}>
            {color}
          </button>
        ))}
      </div>
      <p className='score'>Score: {score}</p>
      <p className='power'>Power: {power} </p>
      <button className='newGame' onClick={newGame}>
        New Game
      </button>
    </div>
  )
}

const Modal = () => {
  return (
    <>
      <div className='modal'>
        <h1>You win !!!</h1>
      </div>
    </>
  )
}

export default App
