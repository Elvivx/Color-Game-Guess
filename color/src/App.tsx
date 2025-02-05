import { useState, useEffect } from "react"
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
  }, [])

  const play = () => {
    if (power.length === 0) return
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
    if (power.length === 0) return

    if (selectedColor === targetColor) {
      setScore(score + 1)
      play()
    } else {
      setPower((prevPower) => prevPower.slice(0, -1))
      play()
    }
  }

  const newGame = () => {
    setScore(0)
    setPower(["⚡", "⚡", "⚡", "⚡", "⚡"])
  }

  return (
    <main>
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
      {!power.length && <Modal newGame={newGame} message="You've Lost 🥲😢😭" />}
      {score > 9 && <Modal newGame={newGame} message='You Win🎉🍾😏' />}
    </main>
  )
}

const Modal: React.FC<ModalProps> = ({ newGame, message }) => {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <h1>{message}</h1>
        <button className='newGame' onClick={newGame}>
          Play Again
        </button>
      </div>
    </div>
  )
}
// Define prop types for the Modal component
interface ModalProps {
  newGame: () => void
  message: string
}

export default App
