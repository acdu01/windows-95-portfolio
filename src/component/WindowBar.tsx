import { List, TaskBar, useModal } from '@react95/core'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useWindowsStore } from '../store/windows'
import thisComputer from '../assets/this_computer.png'
import folderOpen from '../assets/folder_open.png'
import textfile from '../assets/text_file_2.png'
import steam from '../assets/steam.png'
import music from '../assets/music.png'
import tools from '../assets/tools.png'

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
    background: '#f7dce7',
    borderTop: '2px solid #fff2f8',
    borderLeft: '2px solid #fff2f8',
    borderRight: '2px solid #b78ea0',
    borderBottom: '2px solid #b78ea0',
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
    color: '#352b30',
    background: '#d9c7cf',
    borderTop: '2px solid #9d8a93',
    borderLeft: '2px solid #9d8a93',
    borderRight: '2px solid #f4ecef',
    borderBottom: '2px solid #f4ecef',
    pointerEvents: 'none',
  } as const,
} as const

const menuIconStyle = { width: '32px', height: '32px' } as const
const batteryFillStyle = (level: number): CSSProperties => ({
  width: `${Math.max(0, Math.min(100, Math.round(level * 100)))}%`,
  height: '100%',
  background: level <= 0.2 ? '#8f1d1d' : '#352b30',
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
              My Computer
            </List.Item>
            <List.Item
              icon={<img src={folderOpen} alt="Projects" style={menuIconStyle} />}
              onClick={() => openWindow('Projects')}
            >
              Projects
            </List.Item>
            <List.Item
              icon={<img src={textfile} alt="Resume" style={menuIconStyle} />}
              onClick={() => openWindow('Resume.doc')}
            >
              Resume.doc
            </List.Item>
            <List.Item
              icon={<img src={textfile} alt="Thanks" style={menuIconStyle} />}
              onClick={() => openWindow('Thanks.txt')}
            >
              Thanks.txt
            </List.Item>
            <List.Item
              icon={<img src={steam} alt="Games" style={menuIconStyle} />}
              onClick={() => openWindow('Games')}
            >
              Games
            </List.Item>
            <List.Item
              icon={<img src={music} alt="Music" style={menuIconStyle} />}
              onClick={() => openWindow('Music')}
            >
              Music
            </List.Item>
            <List.Item
              icon={<img src={tools} alt="Settings" style={menuIconStyle} />}
              onClick={() => openWindow('Settings')}
            >
              Settings
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
                border: '1px solid #352b30',
                background: '#f4ecef',
                padding: '1px',
                boxSizing: 'border-box',
              }}
            >
              <div style={batteryFillStyle(battery.level)} />
            </div>
            <div style={{ width: '2px', height: '4px', background: '#352b30' }} />
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
                color: '#352b30',
                background: isActive ? '#cfb9c3' : '#dfccd4',
                borderTop: isActive ? '2px solid #8f7c85' : '2px solid #f8eef2',
                borderLeft: isActive ? '2px solid #8f7c85' : '2px solid #f8eef2',
                borderRight: isActive ? '2px solid #f8eef2' : '2px solid #9a8790',
                borderBottom: isActive ? '2px solid #f8eef2' : '2px solid #9a8790',
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
