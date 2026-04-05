import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

type Player = 'X' | 'O'
type Cell = Player | null
type Mode = 'multiplayer' | 'bot'

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const getWinner = (board: Cell[]): Player | null => {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

const pickMove = (board: Cell[], player: Player): number | null => {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== null) continue
    const next = [...board]
    next[i] = player
    if (getWinner(next) === player) return i
  }
  return null
}

const getBotMove = (board: Cell[]): number | null => {
  const winMove = pickMove(board, 'O')
  if (winMove !== null) return winMove

  const blockMove = pickMove(board, 'X')
  if (blockMove !== null) return blockMove

  if (board[4] === null) return 4

  const corners = [0, 2, 6, 8].filter((index) => board[index] === null)
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)]

  const edges = [1, 3, 5, 7].filter((index) => board[index] === null)
  if (edges.length > 0) return edges[Math.floor(Math.random() * edges.length)]

  return null
}

function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(() => Array.from({ length: 9 }, () => null))
  const [turn, setTurn] = useState<Player>('X')
  const [mode, setMode] = useState<Mode>('multiplayer')

  const winner = useMemo(() => getWinner(board), [board])
  const isDraw = useMemo(() => !winner && board.every((cell) => cell !== null), [board, winner])
  const isBotTurn = mode === 'bot' && turn === 'O' && !winner && !isDraw

  const resetGame = () => {
    setBoard(Array.from({ length: 9 }, () => null))
    setTurn('X')
  }

  const play = (index: number) => {
    if (winner || isDraw) return
    if (board[index]) return

    const next = [...board]
    next[index] = turn
    setBoard(next)
    setTurn((prev) => (prev === 'X' ? 'O' : 'X'))
  }

  useEffect(() => {
    if (!isBotTurn) return

    const timeout = window.setTimeout(() => {
      const move = getBotMove(board)
      if (move === null) return

      setBoard((prev) => {
        if (prev[move] !== null) return prev
        const next = [...prev]
        next[move] = 'O'
        return next
      })
      setTurn('X')
    }, 220)

    return () => window.clearTimeout(timeout)
  }, [board, isBotTurn])

  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw game.'
      : mode === 'bot' && turn === 'O'
        ? 'Bot is thinking...'
        : `Turn: ${turn}`

  const modeButtonStyle = (active: boolean): CSSProperties => ({
    background: active ? '#cfb9c3' : '#dfccd4',
    borderTop: active ? '2px solid #8f7c85' : '2px solid #f8eef2',
    borderLeft: active ? '2px solid #8f7c85' : '2px solid #f8eef2',
    borderRight: active ? '2px solid #f8eef2' : '2px solid #9a8790',
    borderBottom: active ? '2px solid #f8eef2' : '2px solid #9a8790',
    padding: '2px 8px',
  })

  return (
    <div style={{ display: 'grid', gap: '8px', width: 'fit-content' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          type="button"
          onClick={() => {
            setMode('multiplayer')
            resetGame()
          }}
          style={modeButtonStyle(mode === 'multiplayer')}
        >
          Multiplayer
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('bot')
            resetGame()
          }}
          style={modeButtonStyle(mode === 'bot')}
        >
          Vs Bot
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#d9c7cf',
          padding: '6px 8px',
          borderTop: '2px solid #f4ecef',
          borderLeft: '2px solid #f4ecef',
          borderRight: '2px solid #76666d',
          borderBottom: '2px solid #76666d',
          minWidth: '220px',
        }}
      >
        <span>{statusText}</span>
        <button
          type="button"
          onClick={resetGame}
          style={{
            background: '#dfccd4',
            borderTop: '2px solid #f8eef2',
            borderLeft: '2px solid #f8eef2',
            borderRight: '2px solid #9a8790',
            borderBottom: '2px solid #9a8790',
            padding: '2px 8px',
          }}
        >
          New
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 54px)',
          gridTemplateRows: 'repeat(3, 54px)',
          gap: '3px',
          background: '#bca9b2',
          padding: '6px',
          borderTop: '2px solid #76666d',
          borderLeft: '2px solid #76666d',
          borderRight: '2px solid #f4ecef',
          borderBottom: '2px solid #f4ecef',
          width: 'fit-content',
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => play(index)}
            disabled={isBotTurn || winner !== null || isDraw}
            style={{
              width: '54px',
              height: '54px',
              fontSize: '22px',
              fontWeight: 700,
              color: cell === 'X' ? '#0000aa' : '#aa0000',
              background: '#dfccd4',
              borderTop: '2px solid #f8eef2',
              borderLeft: '2px solid #f8eef2',
              borderRight: '2px solid #9a8790',
              borderBottom: '2px solid #9a8790',
              opacity: isBotTurn ? 0.92 : 1,
            }}
          >
            {cell ?? ''}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TicTacToe
