import { List } from '@react95/core/List'
import { TaskBar } from '@react95/core/TaskBar'
import { useModal } from '@react95/core'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useWindowsStore } from '../store/windows'
import thisComputer from '../assets/this_computer.png'
import folderOpen from '../assets/folder_open.png'
import textfile from '../assets/text_file_2.png'
import steam from '../assets/steam.png'
import music from '../assets/music.png'
import tools from '../assets/tools.png'
import { useI18n } from '../i18n'

type BatteryManagerLike = {
  level: number
  charging: boolean
  addEventListener: (type: 'levelchange' | 'chargingchange', listener: () => void) => void
  removeEventListener: (type: 'levelchange' | 'chargingchange', listener: () => void) => void
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManagerLike>
}

type BatteryState = {
  level: number | null
  charging: boolean
}

const styles = {
  menu: {
    background: 'var(--chrome-menu-background)',
    borderTop: '2px solid var(--chrome-lightest)',
    borderLeft: '2px solid var(--chrome-lightest)',
    borderRight: '2px solid var(--chrome-menu-shadow)',
    borderBottom: '2px solid var(--chrome-menu-shadow)',
  } as const,
  dateTimeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0 10px',
    position: 'fixed',
    right: '8px',
    bottom: '4px',
    zIndex: 30,
    height: '22px',
    boxSizing: 'border-box',
    color: 'var(--chrome-text)',
    background: 'var(--chrome-material)',
    borderTop: '2px solid var(--chrome-dark)',
    borderLeft: '2px solid var(--chrome-dark)',
    borderRight: '2px solid var(--chrome-lightest)',
    borderBottom: '2px solid var(--chrome-lightest)',
    pointerEvents: 'none',
  } as const,
} as const

const menuIconStyle = { width: '32px', height: '32px' } as const
const batteryFillStyle = (level: number): CSSProperties => ({
  width: `${Math.max(0, Math.min(100, Math.round(level * 100)))}%`,
  height: '100%',
  background: level <= 0.2 ? '#8f1d1d' : 'var(--chrome-text)',
})

const formatRetroDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = '1998'
  return `${month}/${day}/${year}`
}

function WindowBar() {
  const { openWindow, openWindows, windowStack, bringToFront } = useWindowsStore()
  const { restore, focus } = useModal()
  const { t } = useI18n()
  const [now, setNow] = useState(() => new Date())
  const [battery, setBattery] = useState<BatteryState>({ level: null, charging: false })

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let manager: BatteryManagerLike | null = null
    const nav = navigator as NavigatorWithBattery

    const sync = () => {
      if (!manager) return
      setBattery({ level: manager.level, charging: manager.charging })
    }

    const setup = async () => {
      if (!nav.getBattery) return
      manager = await nav.getBattery()
      sync()
      manager.addEventListener('levelchange', sync)
      manager.addEventListener('chargingchange', sync)
    }

    void setup()

    return () => {
      if (!manager) return
      manager.removeEventListener('levelchange', sync)
      manager.removeEventListener('chargingchange', sync)
    }
  }, [])

  const retroDate = formatRetroDate(now)
  const retroTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const activeWindow = windowStack[windowStack.length - 1]

  return (
    <>
      <TaskBar
        className="pastel-taskbar"
        list={
          <List width="200px" style={styles.menu}>
            <List.Item
              icon={<img src={thisComputer} alt="My Computer" style={menuIconStyle} />}
              onClick={() => openWindow('My Computer')}
            >
              {t('windowBar.myComputer')}
            </List.Item>
            <List.Item
              icon={<img src={folderOpen} alt="Projects" style={menuIconStyle} />}
              onClick={() => openWindow('Projects')}
            >
              {t('windowBar.projects')}
            </List.Item>
            <List.Item
              icon={<img src={textfile} alt="Resume" style={menuIconStyle} />}
              onClick={() => openWindow('Resume.doc')}
            >
              {t('windowBar.resume')}
            </List.Item>
            <List.Item
              icon={<img src={textfile} alt="Thanks" style={menuIconStyle} />}
              onClick={() => openWindow('Thanks.txt')}
            >
              {t('windowBar.thanks')}
            </List.Item>
            <List.Item
              icon={<img src={steam} alt="Games" style={menuIconStyle} />}
              onClick={() => openWindow('Games')}
            >
              {t('windowBar.games')}
            </List.Item>
            <List.Item
              icon={<img src={music} alt="Music" style={menuIconStyle} />}
              onClick={() => openWindow('Music')}
            >
              {t('windowBar.music')}
            </List.Item>
            <List.Item
              icon={<img src={tools} alt="Settings" style={menuIconStyle} />}
              onClick={() => openWindow('Settings')}
            >
              {t('windowBar.settings')}
            </List.Item>
            <List.Divider />
            <List.Item
              icon={<img src={thisComputer} alt="Restart" style={menuIconStyle} />}
              onClick={() => window.location.reload()}
            >
              {t('windowBar.shutdown')}
            </List.Item>
          </List>
        }
      />
      <div style={styles.dateTimeBadge}>
        {battery.level !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} title={`Battery ${Math.round(battery.level * 100)}%`}>
            <div
              style={{
                width: '14px',
                height: '8px',
                border: '1px solid var(--chrome-text)',
                background: 'var(--chrome-lightest)',
                padding: '1px',
                boxSizing: 'border-box',
              }}
            >
              <div style={batteryFillStyle(battery.level)} />
            </div>
            <div style={{ width: '2px', height: '4px', background: 'var(--chrome-text)' }} />
            {battery.charging && <span style={{ fontSize: '10px', lineHeight: 1 }}>+</span>}
            <span style={{ marginLeft: '2px' }}>
              {`${Math.round(battery.level * 100)}%`}
            </span>
          </div>
        )}
        <span>{retroDate}</span>
        <span>{retroTime}</span>
      </div>
      <div
        style={{
          position: 'fixed',
          left: '78px',
          right: '220px',
          bottom: '2px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          overflowX: 'auto',
          zIndex: 31,
        }}
      >
        {openWindows.map((title) => {
          const isActive = activeWindow === title
          return (
            <button
              key={title}
              type="button"
              onClick={() => {
                restore(title)
                focus(title)
                openWindow(title)
                bringToFront(title)
              }}
              style={{
                minWidth: '110px',
                maxWidth: '180px',
                height: '22px',
                padding: '0 6px',
                lineHeight: 1,
                fontSize: '11px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'var(--chrome-text)',
                background: isActive ? 'var(--chrome-button-active)' : 'var(--chrome-button)',
                borderTop: isActive ? '2px solid var(--chrome-button-shadow)' : '2px solid var(--chrome-lightest)',
                borderLeft: isActive ? '2px solid var(--chrome-button-shadow)' : '2px solid var(--chrome-lightest)',
                borderRight: isActive ? '2px solid var(--chrome-lightest)' : '2px solid var(--chrome-dark)',
                borderBottom: isActive ? '2px solid var(--chrome-lightest)' : '2px solid var(--chrome-dark)',
              }}
              title={title}
            >
              {title}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default WindowBar
