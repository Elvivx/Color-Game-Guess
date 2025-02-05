import { useState } from "react"
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
  const [status, setStatus] = useState<string>("")

  const play = () => {
    if (power.length === 0) return
    const correctColor = generateRandomColor()
    const colorOptions = [correctColor]

    while (colorOptions.length < 6) {
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
      stat("Correct🎉")
    } else {
      setPower((prevPower) => prevPower.slice(0, -1))
      play()
      stat("Wrong❌")
    }
  }

  const newGame = () => {
    setScore(0)
    play()
    setPower(["⚡", "⚡", "⚡", "⚡", "⚡"])
  }
  const stat = (mess: string) => {
    setStatus(mess)
    setTimeout(() => {
      setStatus("")
    }, 1000)
  }
  return (
    <main>
      <div className='container'>
        <h1>Color Guessing Game</h1>
        <div className='colorBox' style={{ backgroundColor: targetColor }} data-testid='colorBox'></div>
        {status && (
          <p className='status' data-testid='gameStatus'>
            {status}
          </p>
        )}
        <p>Guess the color:</p>
        <div className='options'>
          {options.map((color) => (
            <button key={color} className='option' onClick={() => handleGuess(color)} style={{ background: color }} data-testid='colorOption'>
              {""}
            </button>
          ))}
        </div>
        <p className='score' data-testid='score'>
          Score: {score}
        </p>
        <p className='power'>Power: {power} </p>
        <button className='newGame' onClick={newGame} data-testid='newGameButton'>
          New Game
        </button>
        {!options.length && <Info play={play} />}
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
        <button className='newGame' onClick={newGame} data-testid='newGameButton'>
          Play Again
        </button>
      </div>
    </div>
  )
}

const Info: React.FC<info> = ({ play }) => {
  return (
    <div className='modal' data-testid='gameInstructions'>
      <div className='modal__content'>
        <h1>How to Play!</h1>
        <p>
          Click on the co-responding color shown in the color options to gain points. <br /> Gain 10 points or 10 correct guesses to win, if your guess is wrong your power will be deducted and if
          finished will result to game over.
        </p>
        <button className='newGame' onClick={play}>
          Play
        </button>
      </div>
    </div>
  )
}

interface ModalProps {
  newGame: () => void
  message: string
}
interface info {
  play: () => void
}

export default App
