import { useState } from 'react'
import { CoinTossGame, DiceGame, RouletteGame } from '@betswirl/ui-react'

function App() {
    const [game, setGame] = useState<'dice' | 'cointoss' | 'roulette'>('dice')

    const gameProps = {
        theme: "dark" as const,
        customTheme: {
            "--primary": "rgb(225 159 31)",
            "--play-btn-font": "rgb(74 41 24)",
        } as React.CSSProperties,
        backgroundImage: "/game-bg.png",
    }

    return (
        <div>
            <nav style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                padding: '12px 0',
                marginBottom: '12px',
            }}>
                {(['dice', 'cointoss', 'roulette'] as const).map((g) => (
                    <button
                        key={g}
                        onClick={() => setGame(g)}
                        style={{
                            padding: '8px 16px',
                            background: game === g ? 'rgb(225 159 31)' : 'rgba(255, 255, 255, 0.05)',
                            color: game === g ? 'rgb(74 41 24)' : 'rgba(255, 255, 255, 0.6)',
                            border: game === g ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            outline: 'none',
                        }}
                    >
                        {g === 'cointoss' ? 'Coin Toss' : g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                ))}
            </nav>

            {game === 'dice' && <DiceGame {...gameProps} />}
            {game === 'cointoss' && <CoinTossGame {...gameProps} />}
            {game === 'roulette' && <RouletteGame {...gameProps} />}
        </div>
    )
}

export default App