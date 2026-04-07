import { Fieldset } from '@react95/core/Fieldset'
import { useI18n } from '../i18n'

const styles = {
  page: {
    display: 'grid',
    gap: '12px',
    lineHeight: 1.55,
  } as const,
  list: {
    margin: '0',
    paddingLeft: '18px',
  } as const,
  listItem: {
    marginBottom: '8px',
  } as const,
} as const

const content = {
  en: {
    title: 'How This Site Works',
    intro:
      'This portfolio is a React-based single-page app styled to feel like a late-90s desktop. It uses React95 for a lot of the visual language, but the desktop/window behavior is mostly custom application code.',
    sections: [
      {
        legend: 'Frontend Stack',
        items: [
          'React renders the desktop, windows, file explorer, resume, games, music player, and project viewers as components.',
          'TypeScript provides typing across the UI, state stores, and shared data structures.',
          'Vite handles local development and production bundling.',
          'React95 provides Win95-themed components and base styling such as tabs, fieldsets, taskbar pieces, modals, and title bars.',
        ],
      },
      {
        legend: 'Window System',
        items: [
          'Each desktop icon is wrapped by a reusable DesktopIcon component that opens a window with shared chrome.',
          'That window layer uses React95 modal and title-bar primitives, then adds custom drag, resize, maximize, restore, and z-index behavior.',
          'The taskbar reflects the open-window state so windows can be restored and focused without reopening them.',
        ],
      },
      {
        legend: 'State and Data Flow',
        items: [
          'Zustand stores hold lightweight global state for window management, display settings, and requested music tracks.',
          'Language, theme, text size, and icon size all live in frontend state and update the UI immediately.',
          'Most document and project content is local component content or static folder metadata, not server-fetched data.',
        ],
      },
      {
        legend: 'Assets',
        items: [
          'Project PDFs, images, wallpapers, and music are served as static assets bundled with the site.',
          'Interaction is local UI state.',
        ],
      }
    ],
  },
  zh: {
    title: '这个网站是怎么工作的',
    intro:
      '这个作品集是一个基于 React 的单页应用，被做成了 90 年代末桌面的感觉。React95 提供了很多视觉风格，但桌面和窗口行为本身大多还是自定义应用代码。',
    sections: [
      {
        legend: '前端技术栈',
        items: [
          'React 负责渲染桌面、窗口、文件管理器、简历、小游戏、音乐播放器和项目查看器等组件。',
          'TypeScript 为界面、状态存储和共享数据结构提供类型约束。',
          'Vite 用于本地开发和生产构建。',
          'React95 提供 Win95 风格的组件和基础样式，比如标签页、分组框、任务栏部件、模态框和标题栏。',
        ],
      },
      {
        legend: '窗口系统',
        items: [
          '每个桌面图标都由一个可复用的 DesktopIcon 组件包装，并打开带统一窗口外壳的内容。',
          '窗口层使用 React95 的 modal 和 title bar 基础组件，再叠加自定义的拖动、缩放、最大化、还原和层级管理。',
          '任务栏会读取已打开窗口状态，因此可以直接恢复和聚焦窗口，而不用重新打开。',
        ],
      },
      {
        legend: '状态与数据流',
        items: [
          'Zustand 存储负责管理窗口、显示设置和音乐曲目请求等轻量级全局状态。',
          '语言、主题、文字大小和图标大小都保存在前端状态中，并会立即更新界面。',
          '大部分文档和项目内容来自本地组件内容或静态文件夹元数据，而不是服务器请求的数据。',
        ],
      },
      {
        legend: '资源',
        items: [
          '项目 PDF、图片、壁纸和音乐都作为静态资源随网站一起提供。',
          '交互主要依赖本地 UI 状态。',
        ],
      },
    ],
  },
} as const

function SiteArchitecture() {
  const { language } = useI18n()
  const localized = content[language]

  return (
    <div style={styles.page}>
      <h3 style={{ margin: 0 }}>{localized.title}</h3>
      <p style={{ margin: 0 }}>{localized.intro}</p>
      {localized.sections.map((section) => (
        <Fieldset key={section.legend} legend={section.legend}>
          <ul style={styles.list}>
            {section.items.map((item) => (
              <li key={item} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </Fieldset>
      ))}
    </div>
  )
}

export default SiteArchitecture
