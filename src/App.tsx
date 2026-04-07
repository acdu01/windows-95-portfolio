import { useCallback, useEffect, useState } from 'react'
import ChemRxivPdfViewer from './component/ChemRxivPdfViewer'
import CarbonRnaTemplatesOverview from './component/CarbonRnaTemplatesOverview'
import DesktopIcon from './component/DesktopIcon'
import CrestOverview from './component/CrestOverview'
import FileExplorer from './component/FileExplorer'
import GamesHub from './component/GamesHub'
import MyoAmpImageViewer from './component/MyoAmpImageViewer'
import MusicPlayer, { MUSIC_PLAYER_MIN_HEIGHT, MUSIC_PLAYER_MIN_WIDTH } from './component/MusicPlayer'
import MyoAmpOverview from './component/MyoAmpOverview'
import NeuralNetworkTeachInOverview from './component/NeuralNetworkTeachInOverview'
import ProjectPdfViewer from './component/ProjectPdfViewer'
import Resume from './component/Resume'
import SettingsPanel from './component/SettingsPanel'
import SiteArchitecture from './component/SiteArchitecture'
import TerminalImageViewer from './component/TerminalImageViewer'
import TerminalTheGameOverview from './component/TerminalTheGameOverview'
import Tutorial from './component/Tutorial'
import WindowBar from './component/WindowBar'
import thisComputer from './assets/this_computer.png'
import folderOpen from './assets/folder_open.png'
import textfile from './assets/text_file_2.png'
import steam from './assets/steam.png'
import music from './assets/music.png'
import tools from './assets/tools.png'
import mail from './assets/mail.png'
import { useSettingsStore } from './store/settings'
import { useWindowsStore } from './store/windows'
import { useI18n } from './i18n'

const TUTORIAL_WINDOW_POSITION = { x: 290, y: 70 }
const vaporwaveWallpaperUrl = `${import.meta.env.BASE_URL}wallpapers/vaporwave_wallpaper.jpg`
const classicBlueWallpaperUrl = `${import.meta.env.BASE_URL}wallpapers/classic_blue.svg`

function App() {
  const { openWindow } = useWindowsStore()
  const { textSize, wallpaperMode, iconSize } = useSettingsStore()
  const { t } = useI18n()
  const [projectsFolder, setProjectsFolder] = useState('Projects')
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  )
  const MAIN_COLUMN_X = 16
  const RIGHT_COLUMN_MARGIN = 20
  const ICON_Y = 16
  const ICON_GAP_Y = 88
  const desktopIconFootprintWidth = Math.max(100, iconSize + 44)
  const desktopColumnGap = Math.max(0, Math.min(34, Math.floor((viewportWidth - (MAIN_COLUMN_X * 2) - (desktopIconFootprintWidth * 3)) / 2)))
  const PROJECTS_COLUMN_X = MAIN_COLUMN_X + desktopIconFootprintWidth + desktopColumnGap
  const minimumRightColumnX = PROJECTS_COLUMN_X + desktopIconFootprintWidth + desktopColumnGap
  const preferredRightColumnX = Math.max(
    minimumRightColumnX,
    viewportWidth - desktopIconFootprintWidth - RIGHT_COLUMN_MARGIN,
  )
  const RIGHT_COLUMN_X = preferredRightColumnX
  const open3DReconstructionBundle = useCallback(() => {
    setProjectsFolder('Projects/3D_Reconstruction')
    openWindow('Projects', { x: 110, y: 50 })
    openWindow('3D_Reconstruction', { x: 150, y: 90 })
    openWindow('3D_Reconstruction_paper.pdf', { x: 190, y: 130 })
  }, [openWindow])
  const openMyoAmpBundle = useCallback(() => {
    setProjectsFolder('Projects/MyoAmp')
    openWindow('Projects', { x: 110, y: 50 })
    openWindow('MyoAmp', { x: 150, y: 90 })
    openWindow('myoamp.png', { x: 190, y: 130 })
  }, [openWindow])
  const openCarbonRnaTemplatesBundle = useCallback(() => {
    setProjectsFolder('Projects/RNA_templates')
    openWindow('Projects', { x: 110, y: 50 })
    openWindow('RNA_templates', { x: 150, y: 90 })
    openWindow('ChemRxiv_paper.pdf', { x: 190, y: 130 })
  }, [openWindow])
  const openNeuralNetworkTeachInBundle = useCallback(() => {
    setProjectsFolder('Projects/Neural_Network_Teach_In')
    openWindow('Projects', { x: 110, y: 50 })
    openWindow('Neural_Network_Teach_In', { x: 150, y: 90 })
  }, [openWindow])
  const openTerminalTheGameBundle = useCallback(() => {
    setProjectsFolder('Projects/Terminal_The_Game')
    openWindow('Projects', { x: 110, y: 50 })
    openWindow('Terminal_The_Game', { x: 150, y: 90 })
    openWindow('terminal.png', { x: 190, y: 130 })
  }, [openWindow])
  const openProjectsRoot = useCallback(() => {
    setProjectsFolder('Projects')
    openWindow('Projects')
  }, [openWindow])

  useEffect(() => {
    document.documentElement.style.setProperty('--portfolio-text-size', `${textSize}px`)
    document.documentElement.style.setProperty('--desktop-icon-font-size', `${Math.max(12, textSize)}px`)
  }, [textSize])

  useEffect(() => {
    document.documentElement.dataset.uiTheme = wallpaperMode
  }, [wallpaperMode])

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {wallpaperMode === 'image' ? (
        <img
          src={vaporwaveWallpaperUrl}
          alt="Vaporwave wallpaper"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            zIndex: 0,
          }}
        />
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background: 'linear-gradient(160deg, #0f3f8f 0%, #1e66cc 55%, #7ea9e8 100%)',
            }}
          />
          {wallpaperMode === 'classic_blue' && (
            <img
              src={classicBlueWallpaperUrl}
              alt="Classic Blue wallpaper"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '50%',
                height: '50%',
                transform: 'translate(-50%, -50%)',
                objectFit: 'contain',
                display: 'block',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
          )}
        </>
      )}

      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <DesktopIcon
          icon={<img src={thisComputer} alt="My Computer icon" />}
          name="Anna's Computer"
          desktopLabel={t('desktop.pc')}
          width={700}
          height={460}
          initialX={MAIN_COLUMN_X}
          initialY={ICON_Y}
        >
          <FileExplorer />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="Resume icon" />}
          name="Resume.doc"
          desktopLabel={t('desktop.resume')}
          width={700}
          height={460}
          initialX={MAIN_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y}
        >
          <Resume />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={steam} alt="Games icon" />}
          name="Games"
          desktopLabel={t('desktop.games')}
          width={360}
          height={430}
          minWidth={330}
          minHeight={400}
          initialX={RIGHT_COLUMN_X}
          initialY={ICON_Y}
        >
          <GamesHub />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={music} alt="Music icon" />}
          name="Music"
          desktopLabel={t('desktop.music')}
          width={520}
          height={420}
          minWidth={MUSIC_PLAYER_MIN_WIDTH}
          minHeight={MUSIC_PLAYER_MIN_HEIGHT}
          initialX={RIGHT_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y}
        >
          <MusicPlayer />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="Thanks icon" />}
          name="Thanks.txt"
          desktopLabel={t('desktop.thanks')}
          width={520}
          height={320}
          initialX={RIGHT_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 2}
        >
          <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
            <h3 style={{ margin: 0 }}>{t('thanks.title')}</h3>
            <p style={{ margin: 0 }}>
              <a href="https://www.youtube.com/watch?v=NXXw5sYg71I" target="_blank" rel="noreferrer">Code with Ali</a> {t('thanks.inspirationSuffix')}
            </p>
            <p style={{ margin: 0 }}>
              <a href="https://aconfuseddragon.itch.io/windows-95-plus-1" target="_blank" rel="noreferrer">aconfuseddragon</a> {t('thanks.iconsSuffix')}
            </p>
            <p style={{ margin: 0 }}>
              <a href="https://wall.alphacoders.com/big.php?i=964425" target="_blank" rel="noreferrer">robokoboto</a> {t('thanks.wallpaperSuffix')}
            </p>
            <p style={{ margin: 0 }}>
              {t('thanks.note')}
            </p>
          </div>
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={tools} alt="Settings icon" />}
          name="Settings"
          desktopLabel={t('desktop.settings')}
          width={520}
          height={340}
          minWidth={420}
          minHeight={280}
          initialX={MAIN_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 2}
        >
          <SettingsPanel />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={mail} alt="Contact icon" />}
          name="Contact"
          desktopLabel={t('desktop.contact')}
          width={520}
          height={280}
          minWidth={380}
          minHeight={220}
          initialX={MAIN_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 3}
        >
          <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
            <h3 style={{ margin: 0 }}>{t('contact.title')}</h3>
            <p style={{ margin: 0 }}>
              {t('contact.email')}{' '}
              <a href="mailto:annacdu1@gmail.com">
                annacdu1@gmail.com
              </a>
            </p>
            <p style={{ margin: 0 }}>
              {t('contact.linkedin')}{' '}
              <a href="https://www.linkedin.com/in/annacdu/" target="_blank" rel="noreferrer">
                linkedin.com/in/annacdu
              </a>
            </p>
            <p style={{ margin: 0 }}>
              {t('contact.github')}{' '}
              <a href="https://github.com/acdu01" target="_blank" rel="noreferrer">
                github.com/acdu01
              </a>
            </p>
            <p style={{ margin: 0 }}>
              {t('contact.website')}{' '}
              <a href="https://www.annadu.org" target="_blank" rel="noreferrer">
                annadu.org
              </a>
            </p>
          </div>
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="Tutorial icon" />}
          name="tutorial.doc"
          desktopLabel={t('desktop.tutorial')}
          defaultWindowPosition={TUTORIAL_WINDOW_POSITION}
          width={560}
          height={420}
          minWidth={420}
          minHeight={300}
          initialX={RIGHT_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 3}
          openByDefault
        >
          <Tutorial />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="How This Site Works icon" />}
          name="How_This_Site_Works.txt"
          desktopLabel={t('desktop.siteArchitecture')}
          width={620}
          height={500}
          minWidth={480}
          minHeight={340}
          initialX={RIGHT_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 4}
        >
          <SiteArchitecture />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={folderOpen} alt="Projects icon" />}
          name="Projects"
          desktopLabel={t('desktop.projects')}
          onOpen={openProjectsRoot}
          width={700}
          height={460}
          initialX={PROJECTS_COLUMN_X}
          initialY={ICON_Y}
        >
          <FileExplorer initialFolder={projectsFolder} />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={folderOpen} alt="3D Reconstruction folder icon" />}
          windowIcon={<img src={textfile} alt="3D Reconstruction overview icon" />}
          name="3D_Reconstruction"
          desktopLabel={t('desktop.3d')}
          onOpen={open3DReconstructionBundle}
          width={700}
          height={460}
          minWidth={560}
          minHeight={360}
          initialX={PROJECTS_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y}
        >
          <CrestOverview />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={folderOpen} alt="MyoAmp folder icon" />}
          windowIcon={<img src={textfile} alt="MyoAmp overview icon" />}
          name="MyoAmp"
          desktopLabel={t('desktop.myoamp')}
          onOpen={openMyoAmpBundle}
          width={700}
          height={460}
          minWidth={560}
          minHeight={360}
          initialX={PROJECTS_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 2}
        >
          <MyoAmpOverview />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={folderOpen} alt="RNA templates folder icon" />}
          windowIcon={<img src={textfile} alt="RNA templates overview icon" />}
          name="RNA_templates"
          desktopLabel={t('desktop.rna')}
          onOpen={openCarbonRnaTemplatesBundle}
          width={760}
          height={500}
          minWidth={560}
          minHeight={360}
          initialX={PROJECTS_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 3}
        >
          <CarbonRnaTemplatesOverview />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={folderOpen} alt="Neural Network Teach In folder icon" />}
          windowIcon={<img src={textfile} alt="Neural Network Teach In overview icon" />}
          name="Neural_Network_Teach_In"
          desktopLabel={t('desktop.nn')}
          onOpen={openNeuralNetworkTeachInBundle}
          width={760}
          height={500}
          minWidth={560}
          minHeight={360}
          initialX={PROJECTS_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 4}
        >
          <NeuralNetworkTeachInOverview />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={folderOpen} alt="Terminal The Game folder icon" />}
          windowIcon={<img src={textfile} alt="Terminal The Game overview icon" />}
          name="Terminal_The_Game"
          desktopLabel={t('desktop.terminal')}
          onOpen={openTerminalTheGameBundle}
          width={760}
          height={500}
          minWidth={560}
          minHeight={360}
          initialX={PROJECTS_COLUMN_X}
          initialY={ICON_Y + ICON_GAP_Y * 5}
        >
          <TerminalTheGameOverview />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="Project PDF icon" />}
          name="3D_Reconstruction_paper.pdf"
          showOnDesktop={false}
          width={900}
          height={620}
          minWidth={640}
          minHeight={480}
        >
          <ProjectPdfViewer />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="MyoAmp image file icon" />}
          name="myoamp.png"
          showOnDesktop={false}
          width={780}
          height={560}
          minWidth={520}
          minHeight={380}
        >
          <MyoAmpImageViewer />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="ChemRxiv paper icon" />}
          name="ChemRxiv_paper.pdf"
          showOnDesktop={false}
          width={900}
          height={620}
          minWidth={640}
          minHeight={480}
        >
          <ChemRxivPdfViewer />
        </DesktopIcon>
        <DesktopIcon
          icon={<img src={textfile} alt="Terminal image file icon" />}
          name="terminal.png"
          showOnDesktop={false}
          width={780}
          height={560}
          minWidth={520}
          minHeight={380}
        >
          <TerminalImageViewer />
        </DesktopIcon>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20 }}>
        <WindowBar />
      </div>
    </div>
  )
}

export default App
