import { useState } from 'react'
import type { CSSProperties } from 'react'
import Minesweeper from './Minesweeper'
import TicTacToe from './TicTacToe'

type GameMode = 'minesweeper' | 'tictactoe'

function GamesHub() {
  const [mode, setMode] = useState<GameMode>('minesweeper')

  const tabButton = (active: boolean): CSSProperties => ({
    background: active ? '#cfb9c3' : '#dfccd4',
    borderTop: active ? '2px solid #8f7c85' : '2px solid #f8eef2',
    borderLeft: active ? '2px solid #8f7c85' : '2px solid #f8eef2',
    borderRight: active ? '2px solid #f8eef2' : '2px solid #9a8790',
    borderBottom: active ? '2px solid #f8eef2' : '2px solid #9a8790',
    padding: '2px 10px',
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
