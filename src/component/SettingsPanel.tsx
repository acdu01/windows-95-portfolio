import { useSettingsStore } from '../store/settings'
import type { CSSProperties } from 'react'

function SettingsPanel() {
  const { textSize, setTextSize, wallpaperMode, setWallpaperMode } = useSettingsStore()

  const buttonStyle = (active: boolean): CSSProperties => ({
    background: active ? '#cfb9c3' : '#dfccd4',
    borderTop: active ? '2px solid #8f7c85' : '2px solid #f8eef2',
    borderLeft: active ? '2px solid #8f7c85' : '2px solid #f8eef2',
    borderRight: active ? '2px solid #f8eef2' : '2px solid #9a8790',
    borderBottom: active ? '2px solid #f8eef2' : '2px solid #9a8790',
    padding: '2px 8px',
  })

  return (
    <div style={{ display: 'grid', gap: '10px', maxWidth: '520px' }}>
      <h3 style={{ margin: 0 }}>Display Settings</h3>
      <div
        style={{
          display: 'grid',
          gap: '8px',
          padding: '8px',
          background: '#f4ecef',
          borderTop: '2px solid #9d8a93',
          borderLeft: '2px solid #9d8a93',
          borderRight: '2px solid #f4ecef',
          borderBottom: '2px solid #f4ecef',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700 }}>Text Size Configuration</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" style={buttonStyle(textSize === 12)} onClick={() => setTextSize(12)}>
            Small
          </button>
          <button type="button" style={buttonStyle(textSize === 14)} onClick={() => setTextSize(14)}>
            Normal
          </button>
          <button type="button" style={buttonStyle(textSize === 16)} onClick={() => setTextSize(16)}>
            Large
          </button>
          <button type="button" style={buttonStyle(textSize === 18)} onClick={() => setTextSize(18)}>
            Extra Large
          </button>
        </div>

        <label style={{ display: 'grid', gap: '6px' }}>
          <span style={{ fontSize: '12px' }}>Fine tune: {textSize}px</span>
          <input
            type="range"
            min={12}
            max={20}
            value={textSize}
            onChange={(event) => setTextSize(Number(event.target.value))}
          />
        </label>

        <div
          style={{
            padding: '8px',
            background: '#fff',
            borderTop: '2px solid #9d8a93',
            borderLeft: '2px solid #9d8a93',
            borderRight: '2px solid #f4ecef',
            borderBottom: '2px solid #f4ecef',
          }}
        >
          <div style={{ fontSize: `${textSize}px` }}>Preview text at {textSize}px</div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '8px',
          padding: '8px',
          background: '#f4ecef',
          borderTop: '2px solid #9d8a93',
          borderLeft: '2px solid #9d8a93',
          borderRight: '2px solid #f4ecef',
          borderBottom: '2px solid #f4ecef',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700 }}>Wallpaper Selector</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" style={buttonStyle(wallpaperMode === 'image')} onClick={() => setWallpaperMode('image')}>
            Default
          </button>
          <button type="button" style={buttonStyle(wallpaperMode === 'pink_sky')} onClick={() => setWallpaperMode('pink_sky')}>
            Pink Sky
          </button>
          <button type="button" style={buttonStyle(wallpaperMode === 'classic_blue')} onClick={() => setWallpaperMode('classic_blue')}>
            Classic Blue
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
