import { Fieldset } from '@react95/core/Fieldset'
import { Tab } from '@react95/core/Tab'
import { Tabs } from '@react95/core/Tabs'
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

const tutorialContent = {
  en: {
    tabs: {
      quickStart: 'Quick Start',
      extended: 'Extended Tutorial',
    },
    quick: {
      title: 'Welcome to 1998',
      paragraphs: [
        'Open Resume.doc first for a quick snapshot, then open Projects for technical depth, supporting files, and full project context.',
        'Double-click desktop icons to open them, drag icons or window title bars to move them, resize windows from the bottom-right corner, and use the taskbar to switch between open windows.',
        'Settings lets you change text size, adjust desktop icon size, toggle the interface between languages, and switch themes between Vaporwave and Retro Blue.',
        'There are a few interactive extras too, including Minesweeper and Tic-Tac-Toe under Games, plus a Music player with real tracks and playback controls.',
      ],
    },
    extended: [
      {
        legend: 'Navigation and Windows',
        items: [
          'Double-click any desktop icon to open its window. Single-clicking focuses items without opening them.',
          'Drag desktop icons or a window title bar to move things around. Use the bottom-right resize handle if you want more space.',
          'Each window also supports minimize, maximize, restore, and close from the title bar.',
          'The taskbar keeps a button for every open window so you can jump back to it without reopening it.',
        ],
      },
      {
        legend: 'Projects and File Explorer',
        items: [
          'Projects can be opened from the desktop or the taskbar menu. The explorer has a collapsible folder tree on the left and a file table on the right.',
          'The folder button hides or shows the tree, the magnifying-glass button opens search for the current folder, and the computer button returns you to the Projects home view.',
          'Inside the top-level Projects folder, single-clicking a project highlights it and shows a short preview panel near the bottom.',
          'Double-click folders to enter them, and double-click files to open their linked overview, PDF, image, or music window.',
          'Music files inside the explorer can launch the Music player directly on that track.',
        ],
      },
      {
        legend: 'Settings',
        items: [
          'Text size has both preset buttons and a slider, so you can switch quickly or fine-tune the UI live.',
          'Desktop icon size works the same way, which changes how large the icons appear across the desktop.',
          'Theme switching swaps between Vaporwave and Retro Blue instantly.',
          'Language switching updates the interface between English and Chinese without a reload.',
        ],
      },
      {
        legend: 'Extras',
        items: [
          'Games includes both Minesweeper and Tic-Tac-Toe, and you can switch between them inside the same window.',
          'The Music player includes track selection, play and pause, previous and next, seeking, volume, mute, and loop.',
          'Contact has direct links for email, LinkedIn, GitHub, and the main website. Thanks lists credits for inspiration, icons, and wallpaper.',
        ],
      },
      {
        legend: 'System Details',
        items: [
          'The clock uses a retro 1998 date format while still showing your current local time.',
          'If your browser exposes battery information, a battery badge appears beside the clock automatically.',
          'The tutorial window opens by default, so the desktop starts with a guided entry point instead of a blank screen.',
          'If you want implementation details instead of usage help, open How_This_Site_Works.txt from Documents.',
        ],
      },
    ],
  },
  zh: {
    tabs: {
      quickStart: '快速上手',
      extended: '扩展教程',
    },
    quick: {
      title: '快速教程',
      paragraphs: [
        '建议先打开 Resume.doc 快速了解我，再打开 Projects 查看技术细节、支持文件和完整项目背景。',
        '双击桌面图标即可打开，拖动图标或窗口标题栏可以移动位置，从右下角可以调整窗口大小，也可以使用任务栏在已打开窗口之间切换。',
        'Settings 可以调整文字大小、桌面图标大小、在英文和中文界面之间切换，并在蒸汽波和复古蓝主题之间切换。',
        '这里还有一些可交互的小内容，包括 Games 里的扫雷和井字棋，以及带真实曲目的音乐播放器和播放控制。',
      ],
    },
    extended: [
      {
        legend: '导航与窗口',
        items: [
          '双击任意桌面图标即可打开窗口。单击只会选中或聚焦，不会直接打开。',
          '可以拖动桌面图标或窗口标题栏来移动位置；如果需要更多空间，可以从右下角拖动调整大小。',
          '每个窗口标题栏也支持最小化、最大化、还原和关闭。',
          '任务栏会为每个已打开窗口保留按钮，方便你不重新打开就切换回来。',
        ],
      },
      {
        legend: '项目与文件管理器',
        items: [
          'Projects 可以从桌面或任务栏菜单打开。文件管理器左侧是可折叠的文件夹树，右侧是文件列表。',
          '文件夹按钮可以隐藏或显示目录树，放大镜按钮会打开当前文件夹搜索，电脑按钮会返回 Projects 首页。',
          '在顶层 Projects 文件夹中，单击项目文件夹会高亮显示，并在底部看到简短预览。',
          '双击文件夹可以进入，双击文件会打开对应的概述、PDF、图片或音乐窗口。',
          '在文件管理器中双击音乐文件时，会直接打开 Music 播放器并切换到对应曲目。',
        ],
      },
      {
        legend: '设置',
        items: [
          '文字大小既有预设按钮，也有滑块，既能快速切换，也能实时微调界面。',
          '桌面图标大小同样支持预设和滑块，会直接改变桌面图标的显示尺寸。',
          '主题切换会立即在蒸汽波和复古蓝之间切换。',
          '语言切换会在英文和中文之间即时更新界面，不需要刷新页面。',
        ],
      },
      {
        legend: '额外内容',
        items: [
          'Games 窗口里同时有扫雷和井字棋，可以在同一个窗口内切换。',
          'Music 播放器支持曲目切换、播放暂停、上一首下一首、进度拖动、音量、静音和循环。',
          'Contact 提供邮箱、LinkedIn、GitHub 和个人网站链接；Thanks 列出了灵感、图标和壁纸来源。',
        ],
      },
      {
        legend: '系统细节',
        items: [
          '时钟会保持 1998 风格的日期格式，同时显示你当前设备的本地时间。',
          '如果浏览器提供电池信息，时钟旁边会自动显示电池徽标。',
          '教程窗口默认就是打开的，让桌面一开始就有明确的使用入口，而不是空白状态。',
          '如果你想看实现方式而不是使用说明，可以在 Documents 中打开 How_This_Site_Works.txt。',
        ],
      },
    ],
  },
} as const

function Tutorial() {
  const { language } = useI18n()
  const content = tutorialContent[language]

  return (
    <Tabs defaultActiveTab={content.tabs.quickStart}>
      <Tab title={content.tabs.quickStart}>
        <div style={styles.page}>
          <h3 style={{ margin: 0 }}>{content.quick.title}</h3>
          {content.quick.paragraphs.map((paragraph) => (
            <p key={paragraph} style={{ margin: 0 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </Tab>

      <Tab title={content.tabs.extended}>
        <div style={styles.page}>
          {content.extended.map((section) => (
            <Fieldset key={section.legend} legend={section.legend}>
              <ul style={styles.list}>
                {section.items.map((item) => (
                  <li key={item} style={styles.listItem}>{item}</li>
                ))}
              </ul>
            </Fieldset>
          ))}
        </div>
      </Tab>
    </Tabs>
  )
}

export default Tutorial
