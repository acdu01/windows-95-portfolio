import React, { type ComponentType, type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react'
import { Modal, TitleBar, useModal } from '@react95/core'
import { useWindowsStore } from '../store/windows'

const styles = {
  desktopIcon: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '100px',
    gap: '10px',
    position: 'absolute',
    zIndex: 0,
    touchAction: 'none',
  },
  iconName: {
    color: '#ffffff',
    fontSize: 'var(--desktop-icon-font-size, 14px)',
    margin: '0',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
    userSelect: 'none',
  },
} as const

interface WindowProps {
  icon: ReactElement
  title: string
  children: ReactNode
  defaultPosition?: { x: number; y: number }
  zIndex: number
  onFocus: () => void
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  onClose: () => void
}

interface DesktopIconProps {
  icon: ReactElement
  windowIcon?: ReactElement
  name: string
  children: ReactNode
  showOnDesktop?: boolean
  onOpen?: () => void
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  initialX?: number
  initialY?: number
}

type DragState = {
  pointerId: number
  offsetX: number
  offsetY: number
}

type ResizeState = {
  pointerId: number
  startX: number
  startY: number
  startWidth: number
  startHeight: number
}

const sizedIcon = (icon: ReactElement, size: number): ReactElement => {
  if (typeof icon.type === 'string' && icon.type === 'img') {
    return React.cloneElement(icon as ReactElement<{ style?: React.CSSProperties }>, {
      style: {
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        ...((icon.props as { style?: React.CSSProperties }).style ?? {}),
      },
    })
  }

  return React.cloneElement(icon as ReactElement<{ variant?: string }>, {
    variant: size <= 16 ? '16x16_4' : '32x32_4',
  })
}

const Window = ({ title, onClose, children, icon, defaultPosition, zIndex, onFocus, width, height, minWidth = 320, minHeight = 220 }: WindowProps) => {
  const { minimize, subscribe, focus } = useModal()
  const [size, setSize] = useState(() => ({
    width: Math.max(minWidth, width ?? 640),
    height: Math.max(minHeight, height ?? 420),
  }))
  const [isFullscreen, setIsFullscreen] = useState(false)
  const previousSizeRef = useRef(size)
  const resizeRef = useRef<ResizeState | null>(null)

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const resizeState = resizeRef.current
      if (!resizeState || resizeState.pointerId !== event.pointerId) return

      if (isFullscreen) return

      const nextWidth = Math.max(minWidth, resizeState.startWidth + (event.clientX - resizeState.startX))
      const nextHeight = Math.max(minHeight, resizeState.startHeight + (event.clientY - resizeState.startY))
      setSize({ width: nextWidth, height: nextHeight })
    }

    const onPointerUp = (event: PointerEvent) => {
      const resizeState = resizeRef.current
      if (!resizeState || resizeState.pointerId !== event.pointerId) return
      resizeRef.current = null
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [isFullscreen, minHeight, minWidth])

  useEffect(() => {
    if (!isFullscreen) return

    const applyFullscreenSize = () => {
      setSize({
        width: Math.max(minWidth, window.innerWidth - 16),
        height: Math.max(minHeight, window.innerHeight - 56),
      })
    }

    applyFullscreenSize()
    window.addEventListener('resize', applyFullscreenSize)
    return () => window.removeEventListener('resize', applyFullscreenSize)
  }, [isFullscreen, minHeight, minWidth])

  useEffect(() => {
    const event = 'modal-visibility-changed' as Parameters<typeof subscribe>[0]
    const unsubscribe = subscribe(event, ({ id }) => {
      if (id === title) {
        onFocus()
      }
    })
    return unsubscribe
  }, [onFocus, subscribe, title])

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setIsFullscreen(false)
      setSize(previousSizeRef.current)
      return
    }

    previousSizeRef.current = size
    setIsFullscreen(true)
  }

  return (
    <SafeModal
      className="pastel-window"
      id={title}
      icon={icon}
      title={title}
      dragOptions={defaultPosition ? { defaultPosition } : undefined}
      style={{ zIndex }}
      onMouseDownCapture={() => {
        onFocus()
        focus(title)
      }}
      titleBarOptions={[
        <TitleBar.Minimize
          style={{ marginBlock: 'auto' }}
          key="minimize"
          onClick={() => minimize(title)}
        />,
        isFullscreen ? (
          <TitleBar.Restore
            style={{ marginBlock: 'auto' }}
            key="restore"
            onClick={toggleFullscreen}
          />
        ) : (
          <TitleBar.Maximize
            style={{ marginBlock: 'auto' }}
            key="maximize"
            onClick={toggleFullscreen}
          />
        ),
        <TitleBar.Close style={{ marginBlock: 'auto' }} key="close" onClick={onClose} />,
      ]}
    >
      <div style={{ position: 'relative' }}>
        <Modal.Content width={`${size.width}px`} height={`${size.height}px`}>
          <div
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              overflowX: 'auto',
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        </Modal.Content>
        <div
          onPointerDown={(event) => {
            if (isFullscreen) return
            if (event.button !== 0) return
            resizeRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startY: event.clientY,
              startWidth: size.width,
              startHeight: size.height,
            }
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          style={{
            position: 'absolute',
            right: '4px',
            bottom: '4px',
            width: '14px',
            height: '14px',
            cursor: isFullscreen ? 'default' : 'nwse-resize',
            opacity: isFullscreen ? 0.3 : 1,
            background:
              'linear-gradient(135deg, transparent 0 35%, #8a8a8a 35% 45%, transparent 45% 55%, #8a8a8a 55% 65%, transparent 65% 100%)',
          }}
        />
      </div>
    </SafeModal>
  )
}

const DesktopIcon = ({
  icon,
  windowIcon,
  name,
  children,
  showOnDesktop = true,
  onOpen,
  width,
  height,
  minWidth,
  minHeight,
  initialX = 16,
  initialY = 16,
}: DesktopIconProps) => {
  const { openWindow, closeWindow, isWindowOpen, getWindowPosition, getWindowZIndex, bringToFront } = useWindowsStore()
  const { focus, restore } = useModal()
  const isOpen = isWindowOpen(name)
  const defaultPosition = getWindowPosition(name)
  const windowZIndex = getWindowZIndex(name)
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    const ICON_WIDTH = 120
    const ICON_HEIGHT = 120

    const onPointerMove = (event: PointerEvent) => {
      const dragState = dragRef.current
      if (!dragState || dragState.pointerId !== event.pointerId) return

      const maxX = Math.max(0, window.innerWidth - ICON_WIDTH)
      const maxY = Math.max(0, window.innerHeight - ICON_HEIGHT)
      const nextX = Math.max(0, Math.min(maxX, event.clientX - dragState.offsetX))
      const nextY = Math.max(0, Math.min(maxY, event.clientY - dragState.offsetY))
      setPosition({ x: nextX, y: nextY })
    }

    const onPointerUp = (event: PointerEvent) => {
      const dragState = dragRef.current
      if (!dragState || dragState.pointerId !== event.pointerId) return
      dragRef.current = null
      setIsDragging(false)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    }
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  return (
    <>
      {showOnDesktop && (
        <div
          style={{
            ...styles.desktopIcon,
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
          onDoubleClick={() => {
            if (onOpen) {
              onOpen()
              return
            }
            openWindow(name)
            restore(name)
            focus(name)
            bringToFront(name)
          }}
        >
          {sizedIcon(icon, 32)}
          <p style={styles.iconName}>{name}</p>
        </div>
      )}

      {isOpen && (
        <Window
          width={width}
          height={height}
          minWidth={minWidth}
          minHeight={minHeight}
          defaultPosition={defaultPosition}
          zIndex={windowZIndex}
          onFocus={() => bringToFront(name)}
          icon={sizedIcon(windowIcon ?? icon, 16)}
          title={name}
          onClose={() => closeWindow(name)}
        >
          {children}
        </Window>
      )}
    </>
  )
}

export default DesktopIcon

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SafeModal = Modal as unknown as ComponentType<any>
