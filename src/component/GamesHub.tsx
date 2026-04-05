import { useState } from 'react'
import type { CSSProperties } from 'react'
import Minesweeper from './Minesweeper'
import TicTacToe from './TicTacToe'

type GameMode = 'minesweeper' | 'tictactoe'

function GamesHub() {
  const [mode, setMode] = useState<GameMode>('minesweeper')

  const tabButton = (active: boolean): CSSProperties => ({
    background: active ? 'var(--chrome-button-active)' : 'var(--chrome-button)',
    borderTop: active ? '2px solid var(--chrome-button-shadow)' : '2px solid var(--chrome-lightest)',
    borderLeft: active ? '2px solid var(--chrome-button-shadow)' : '2px solid var(--chrome-lightest)',
    borderRight: active ? '2px solid var(--chrome-lightest)' : '2px solid var(--chrome-dark)',
    borderBottom: active ? '2px solid var(--chrome-lightest)' : '2px solid var(--chrome-dark)',
    padding: '2px 10px',
    color: 'var(--chrome-text)',
  })

  return (
    <div style={{ display: 'grid', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button type="button" style={tabButton(mode === 'minesweeper')} onClick={() => setMode('minesweeper')}>
          Minesweeper
        </button>
        <button type="button" style={tabButton(mode === 'tictactoe')} onClick={() => setMode('tictactoe')}>
          Tic-Tac-Toe
        </button>
      </div>
      {mode === 'minesweeper' ? <Minesweeper /> : <TicTacToe />}
    </div>
  )
}

export default GamesHub
