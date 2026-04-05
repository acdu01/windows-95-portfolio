import terminalImage from '../assets/projects/terminal.png'

function TerminalImageViewer() {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '8px', height: '100%' }}>
      <div
        style={{
          fontSize: '12px',
          padding: '6px 8px',
          background: '#f4ecef',
          borderTop: '2px solid #9d8a93',
          borderLeft: '2px solid #9d8a93',
          borderRight: '2px solid #f4ecef',
          borderBottom: '2px solid #f4ecef',
        }}
      >
        terminal.png
      </div>
      <div style={{ minHeight: 0, overflow: 'auto' }}>
        <img
          src={terminalImage}
          alt="Terminal: The Game"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            borderTop: '2px solid #76666d',
            borderLeft: '2px solid #76666d',
            borderRight: '2px solid #f4ecef',
            borderBottom: '2px solid #f4ecef',
            background: '#f4ecef',
          }}
        />
      </div>
    </div>
  )
}

export default TerminalImageViewer
