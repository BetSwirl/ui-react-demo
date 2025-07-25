import {DiceGame} from '@betswirl/ui'  // Added: Import casino game component
import './App.css'

function App() {
    return (
        <DiceGame
            theme="dark"
            customTheme={{
                "--primary": "rgb(74 41 24)",
                "--play-btn-font": "rgb(225 159 31)",
            } as React.CSSProperties}
            backgroundImage="/game-bg.png"
        />
    )
}

export default App
