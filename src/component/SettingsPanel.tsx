import { useSettingsStore } from '../store/settings'
import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'

function SettingsPanel() {
  const { textSize, setTextSize, wallpaperMode, setWallpaperMode, language, setLanguage } = useSettingsStore()
  const { t } = useI18n()

  const buttonStyle = (active: boolean): CSSProperties => ({
    background: active ? 'var(--chrome-button-active)' : 'var(--chrome-button)',
    borderTop: active ? '2px solid var(--chrome-button-shadow)' : '2px solid var(--chrome-lightest)',
    borderLeft: active ? '2px solid var(--chrome-button-shadow)' : '2px solid var(--chrome-lightest)',
    borderRight: active ? '2px solid var(--chrome-lightest)' : '2px solid var(--chrome-dark)',
    borderBottom: active ? '2px solid var(--chrome-lightest)' : '2px solid var(--chrome-dark)',
    padding: '2px 8px',
    color: 'var(--chrome-text)',
  })

  return (
    <div style={{ display: 'grid', gap: '10px', maxWidth: '520px' }}>
      <h3 style={{ margin: 0 }}>{t('settings.title')}</h3>
      <div
        style={{
          display: 'grid',
          gap: '8px',
          padding: '8px',
          background: 'var(--chrome-input-background)',
          borderTop: '2px solid var(--chrome-dark)',
          borderLeft: '2px solid var(--chrome-dark)',
          borderRight: '2px solid var(--chrome-lightest)',
          borderBottom: '2px solid var(--chrome-lightest)',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700 }}>{t('settings.textSize')}</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" style={buttonStyle(textSize === 12)} onClick={() => setTextSize(12)}>
            {t('settings.small')}
          </button>
          <button type="button" style={buttonStyle(textSize === 14)} onClick={() => setTextSize(14)}>
            {t('settings.normal')}
          </button>
          <button type="button" style={buttonStyle(textSize === 16)} onClick={() => setTextSize(16)}>
            {t('settings.large')}
          </button>
          <button type="button" style={buttonStyle(textSize === 18)} onClick={() => setTextSize(18)}>
            {t('settings.extraLarge')}
          </button>
        </div>

        <label style={{ display: 'grid', gap: '6px' }}>
          <span style={{ fontSize: '12px' }}>{t('settings.fineTune', { size: textSize })}</span>
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
            borderTop: '2px solid var(--chrome-dark)',
            borderLeft: '2px solid var(--chrome-dark)',
            borderRight: '2px solid var(--chrome-lightest)',
            borderBottom: '2px solid var(--chrome-lightest)',
          }}
        >
          <div style={{ fontSize: `${textSize}px` }}>{t('settings.preview', { size: textSize })}</div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '8px',
          padding: '8px',
          background: 'var(--chrome-input-background)',
          borderTop: '2px solid var(--chrome-dark)',
          borderLeft: '2px solid var(--chrome-dark)',
          borderRight: '2px solid var(--chrome-lightest)',
          borderBottom: '2px solid var(--chrome-lightest)',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700 }}>{t('settings.wallpaper')}</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" style={buttonStyle(wallpaperMode === 'image')} onClick={() => setWallpaperMode('image')}>
            {t('settings.default')}
          </button>
          <button type="button" style={buttonStyle(wallpaperMode === 'pink_sky')} onClick={() => setWallpaperMode('pink_sky')}>
            {t('settings.pinkSky')}
          </button>
          <button type="button" style={buttonStyle(wallpaperMode === 'classic_blue')} onClick={() => setWallpaperMode('classic_blue')}>
            {t('settings.classicBlue')}
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '8px',
          padding: '8px',
          background: 'var(--chrome-input-background)',
          borderTop: '2px solid var(--chrome-dark)',
          borderLeft: '2px solid var(--chrome-dark)',
          borderRight: '2px solid var(--chrome-lightest)',
          borderBottom: '2px solid var(--chrome-lightest)',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700 }}>{t('settings.language')}</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" style={buttonStyle(language === 'en')} onClick={() => setLanguage('en')}>
            {t('settings.english')}
          </button>
          <button type="button" style={buttonStyle(language === 'zh')} onClick={() => setLanguage('zh')}>
            {t('settings.chinese')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
