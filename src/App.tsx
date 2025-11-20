import { useState } from 'react'
import { CoinTossGame, DiceGame, RouletteGame } from '@betswirl/ui-react'
import { CASINO_GAME_TYPE, labelCasinoGameByType } from '@betswirl/sdk-core'
function App() {
    const [game, setGame] = useState<CASINO_GAME_TYPE>(CASINO_GAME_TYPE.DICE)
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
                {([CASINO_GAME_TYPE.DICE, CASINO_GAME_TYPE.COINTOSS, CASINO_GAME_TYPE.ROULETTE] as const).map((g) => (
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
                        {labelCasinoGameByType[g]}
                    </button>
                ))}
            </nav>

            {game === CASINO_GAME_TYPE.DICE && <DiceGame  {...gameProps}/>}
            {game === CASINO_GAME_TYPE.COINTOSS && <CoinTossGame {...gameProps} />}
            {game === CASINO_GAME_TYPE.ROULETTE && <RouletteGame {...gameProps} />}
        </div>
    )
}

export default App
