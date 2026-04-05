import { useMemo, useState } from 'react'

const ROWS = 9
const COLS = 9
const MINES = 10

type GameStatus = 'playing' | 'won' | 'lost'

type Cell = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

const createEmptyBoard = (): Cell[][] =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  )

const inBounds = (row: number, col: number): boolean => row >= 0 && row < ROWS && col >= 0 && col < COLS

const neighbors = (row: number, col: number): Array<[number, number]> => {
  const points: Array<[number, number]> = []
  for (let r = row - 1; r <= row + 1; r += 1) {
    for (let c = col - 1; c <= col + 1; c += 1) {
      if ((r !== row || c !== col) && inBounds(r, c)) {
        points.push([r, c])
      }
    }
  }
  return points
}

const createBoard = (): Cell[][] => {
  const board = createEmptyBoard()

  let placed = 0
  while (placed < MINES) {
    const row = Math.floor(Math.random() * ROWS)
    const col = Math.floor(Math.random() * COLS)
    if (!board[row][col].isMine) {
      board[row][col].isMine = true
      placed += 1
    }
  }

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      board[row][col].adjacentMines = neighbors(row, col).reduce((count, [nRow, nCol]) => {
        return count + (board[nRow][nCol].isMine ? 1 : 0)
      }, 0)
    }
  }

  return board
}

function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard())
  const [status, setStatus] = useState<GameStatus>('playing')
  const [flagMode, setFlagMode] = useState(false)

  const flaggedCount = useMemo(() => {
    return board.flat().filter((cell) => cell.isFlagged).length
  }, [board])

  const resetGame = () => {
    setBoard(createBoard())
    setStatus('playing')
    setFlagMode(false)
  }

  const revealAllMines = (nextBoard: Cell[][]) => {
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        if (nextBoard[row][col].isMine) {
          nextBoard[row][col].isRevealed = true
        }
      }
    }
  }

  const checkWin = (nextBoard: Cell[][]): boolean => {
    const revealedSafeCells = nextBoard.flat().filter((cell) => cell.isRevealed && !cell.isMine).length
    return revealedSafeCells === ROWS * COLS - MINES
  }

  const revealArea = (nextBoard: Cell[][], startRow: number, startCol: number) => {
    const stack: Array<[number, number]> = [[startRow, startCol]]

    while (stack.length > 0) {
      const [row, col] = stack.pop() as [number, number]
      const cell = nextBoard[row][col]
      if (cell.isRevealed || cell.isFlagged) continue

      cell.isRevealed = true

      if (cell.adjacentMines === 0 && !cell.isMine) {
        for (const [nRow, nCol] of neighbors(row, col)) {
          const neighborCell = nextBoard[nRow][nCol]
          if (!neighborCell.isRevealed && !neighborCell.isMine) {
            stack.push([nRow, nCol])
          }
        }
      }
    }
  }

  const onReveal = (row: number, col: number) => {
    if (status !== 'playing') return

    const current = board[row][col]
    if (current.isRevealed || current.isFlagged) return

    const nextBoard = board.map((line) => line.map((cell) => ({ ...cell })))
    const clicked = nextBoard[row][col]

    if (clicked.isMine) {
      revealAllMines(nextBoard)
      setBoard(nextBoard)
      setStatus('lost')
      return
    }

    revealArea(nextBoard, row, col)

    if (checkWin(nextBoard)) {
      setStatus('won')
    }

    setBoard(nextBoard)
  }

  const toggleFlagAt = (row: number, col: number) => {
    if (status !== 'playing') return

    const nextBoard = board.map((line) => line.map((cell) => ({ ...cell })))
    const target = nextBoard[row][col]
    if (target.isRevealed) return

    target.isFlagged = !target.isFlagged
    setBoard(nextBoard)
  }

  const onFlag = (event: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => {
    event.preventDefault()
    toggleFlagAt(row, col)
  }

  const statusText =
    status === 'won' ? 'Ayo pro gamer!' : status === 'lost' ? 'Boom!!! Try again.' : 'Good luck!'

  const numberColors: Record<number, string> = {
    1: '#0000aa',
    2: '#008200',
    3: '#aa0000',
    4: '#000084',
    5: '#840000',
    6: '#008284',
    7: '#000000',
    8: '#666666',
  }

  return (
    <div style={{ display: 'grid', gap: '8px', width: 'fit-content' }}>
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
          minWidth: '240px',
        }}
      >
        <span>Mines left: {Math.max(0, MINES - flaggedCount)}</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setFlagMode((value) => !value)}
            style={{
              background: flagMode ? '#cfb9c3' : '#dfccd4',
              borderTop: flagMode ? '2px solid #8f7c85' : '2px solid #f8eef2',
              borderLeft: flagMode ? '2px solid #8f7c85' : '2px solid #f8eef2',
              borderRight: flagMode ? '2px solid #f8eef2' : '2px solid #9a8790',
              borderBottom: flagMode ? '2px solid #f8eef2' : '2px solid #9a8790',
              padding: '2px 8px',
            }}
          >
            Flag
          </button>
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
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 26px)`,
          gridTemplateRows: `repeat(${ROWS}, 26px)`,
          gap: '2px',
          background: '#bca9b2',
          padding: '6px',
          borderTop: '2px solid #76666d',
          borderLeft: '2px solid #76666d',
          borderRight: '2px solid #f4ecef',
          borderBottom: '2px solid #f4ecef',
          width: 'fit-content',
        }}
      >
          {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const label = cell.isFlagged
              ? 'F'
              : !cell.isRevealed
                ? ''
                : cell.isMine
                  ? 'X'
                  : cell.adjacentMines || ''
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                onClick={() => {
                  if (flagMode) {
                    toggleFlagAt(rowIndex, colIndex)
                    return
                  }
                  onReveal(rowIndex, colIndex)
                }}
                onContextMenu={(event) => onFlag(event, rowIndex, colIndex)}
                style={{
                  width: '26px',
                  height: '26px',
                  padding: 0,
                  lineHeight: '24px',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: cell.isFlagged
                    ? '#000000'
                    : cell.isMine && cell.isRevealed
                      ? '#aa0000'
                      : numberColors[cell.adjacentMines] ?? '#000',
                  background: cell.isRevealed ? '#e8dce1' : '#dfccd4',
                  borderTop: cell.isRevealed ? '1px solid #9a8790' : '2px solid #f8eef2',
                  borderLeft: cell.isRevealed ? '1px solid #9a8790' : '2px solid #f8eef2',
                  borderRight: cell.isRevealed ? '1px solid #f8eef2' : '2px solid #9a8790',
                  borderBottom: cell.isRevealed ? '1px solid #f8eef2' : '2px solid #9a8790',
                }}
              >
                {label}
              </button>
            )
          }),
        )}
      </div>

      <div style={{ fontSize: '12px' }}>
        {statusText} {flagMode ? 'Flag mode is on.' : 'Right-click or use Flag mode to place flags.'}
      </div>
    </div>
  )
}

export default Minesweeper
