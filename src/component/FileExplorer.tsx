import { Frame } from '@react95/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import folderClosed from '../assets/folder_closed.png'
import folderOpen from '../assets/folder_open.png'
import thisComputer from '../assets/this_computer.png'
import textFile from '../assets/text_file.png'
import textFile2 from '../assets/text_file_2.png'
import sounds from '../assets/sounds.png'
import search from '../assets/search.png'
import { useMusicStore } from '../store/music'
import { useWindowsStore } from '../store/windows'

type FileItem = {
  name: string
  kind: 'folder' | 'text' | 'doc' | 'pdf' | 'audio' | 'image'
  size: string
  modified: string
  targetPath?: string
  openWindow?: string
  trackName?: string
  preview?: string
}

type FolderData = {
  path: string
  name: string
  items: FileItem[]
}

const folders: FolderData[] = [
  {
    path: 'Projects',
    name: 'Projects',
    items: [
      {
        name: '3D_Reconstruction',
        kind: 'folder',
        size: '--',
        modified: '04/25/1998',
        targetPath: 'Projects/3D_Reconstruction',
        preview: 'Underwater 3D reconstruction research: depth-informed preprocessing + learned feature extraction for robust mapping in low-visibility vent environments.',
      },
      {
        name: 'MyoAmp',
        kind: 'folder',
        size: '--',
        modified: '04/26/1998',
        targetPath: 'Projects/MyoAmp',
        preview: 'Neurorehabilitation-focused EMG system that translates muscle activity into interpretable real-time feedback for stroke recovery, with TDNN-based temporal modeling for subtle activation detection.',
      },
      {
        name: 'RNA_templates',
        kind: 'folder',
        size: '--',
        modified: '04/27/1998',
        targetPath: 'Projects/RNA_templates',
        preview: 'Origins-of-life molecular simulation project exploring DLC carbon surfaces as potential templates for abiotic RNA oligomer formation.',
      },
      {
        name: 'Neural_Network_Teach_In',
        kind: 'folder',
        size: '--',
        modified: '04/28/1998',
        targetPath: 'Projects/Neural_Network_Teach_In',
        preview: 'Interactive neural-network teach-in with hands-on implementations of forward pass, backpropagation, and training for beginners.',
      },
      {
        name: 'Terminal_The_Game',
        kind: 'folder',
        size: '--',
        modified: '04/29/1998',
        targetPath: 'Projects/Terminal_The_Game',
        preview: 'Pygame-based murder mystery with clue discovery, branching interactions, and narrative-driven investigation mechanics.',
      },
    ],
  },
  {
    path: 'Projects/3D_Reconstruction',
    name: '3D_Reconstruction',
    items: [
      { name: '3D_Reconstruction_overview.txt', kind: 'text', size: '5 KB', modified: '04/25/1998', openWindow: '3D_Reconstruction' },
      { name: '3D_Reconstruction_paper.pdf', kind: 'pdf', size: '1.1 MB', modified: '04/25/1998', openWindow: '3D_Reconstruction_paper.pdf' },
    ],
  },
  {
    path: 'Projects/MyoAmp',
    name: 'MyoAmp',
    items: [
      { name: 'MyoAmp_overview.txt', kind: 'text', size: '6 KB', modified: '04/26/1998', openWindow: 'MyoAmp' },
      { name: 'myoamp.png', kind: 'image', size: '689 KB', modified: '04/26/1998', openWindow: 'myoamp.png' },
    ],
  },
  {
    path: 'Projects/RNA_templates',
    name: 'RNA_templates',
    items: [
      {
        name: 'RNA_templates_overview.txt',
        kind: 'text',
        size: '7 KB',
        modified: '04/27/1998',
        openWindow: 'RNA_templates',
      },
      {
        name: 'ChemRxiv_paper.pdf',
        kind: 'pdf',
        size: '2.4 MB',
        modified: '04/27/1998',
        openWindow: 'ChemRxiv_paper.pdf',
      },
    ],
  },
  {
    path: 'Projects/Neural_Network_Teach_In',
    name: 'Neural_Network_Teach_In',
    items: [
      {
        name: 'Teach_In_Overview.txt',
        kind: 'text',
        size: '6 KB',
        modified: '04/28/1998',
        openWindow: 'Neural_Network_Teach_In',
      },
    ],
  },
  {
    path: 'Projects/Terminal_The_Game',
    name: 'Terminal_The_Game',
    items: [
      {
        name: 'Terminal_Overview.txt',
        kind: 'text',
        size: '5 KB',
        modified: '04/29/1998',
        openWindow: 'Terminal_The_Game',
      },
      {
        name: 'terminal.png',
        kind: 'image',
        size: '217 KB',
        modified: '04/29/1998',
        openWindow: 'terminal.png',
      },
    ],
  },
  {
    path: 'Documents',
    name: 'Documents',
    items: [
      { name: 'Resume.doc', kind: 'doc', size: '96 KB', modified: '03/08/1998', openWindow: 'Resume.doc' },
      { name: 'Thanks.txt', kind: 'text', size: '4 KB', modified: '04/04/1998', openWindow: 'Thanks.txt' },
      { name: 'tutorial.txt', kind: 'text', size: '5 KB', modified: '04/05/1998', openWindow: 'tutorial.txt' },
    ],
  },
  {
    path: 'Music',
    name: 'Music',
    items: [
      { name: "Can't_Stop.mp3", kind: 'audio', size: '4.1 MB', modified: '04/04/1998', trackName: "Can't Stop.mp3", openWindow: 'Music' },
      { name: 'Seven_Nation_Army.mp3', kind: 'audio', size: '3.6 MB', modified: '04/04/1998', trackName: 'Seven Nation Army.mp3', openWindow: 'Music' },
    ],
  },
]

const topLevelFolders = ['Projects', 'Documents', 'Music']
const folderMap = new Map(folders.map((folder) => [folder.path, folder]))
const projectSubfolders = folders
  .filter((folder) => folder.path.startsWith('Projects/') && !folder.path.slice('Projects/'.length).includes('/'))
  .map((folder) => folder.path)

const styles = {
  root: { display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' } as const,
  toolbar: { display: 'flex', gap: '6px', padding: '6px' } as const,
  body: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: '6px', padding: '0 6px 6px 6px' } as const,
  pane: { height: '100%', overflow: 'auto', padding: '6px', background: '#f4ecef' } as const,
  folderRow: { display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 6px', cursor: 'pointer' } as const,
  tableHead: { display: 'grid', gridTemplateColumns: '1fr 90px 110px', fontWeight: 700, padding: '4px 8px', borderBottom: '1px solid #97858d' } as const,
  status: { margin: '0 6px 6px 6px', padding: '4px 8px', fontSize: '12px', background: '#f4ecef' } as const,
} as const

function iconFor(item: FileItem) {
  if (item.kind === 'folder') return <img src={folderClosed} alt="" style={{ width: '16px', height: '16px' }} />
  if (item.kind === 'audio') {
    return <img src={sounds} alt="" style={{ width: '16px', height: '16px' }} />
  }
  if (item.kind === 'doc') return <img src={textFile2} alt="" style={{ width: '16px', height: '16px' }} />
  if (item.kind === 'pdf') return <img src={textFile2} alt="" style={{ width: '16px', height: '16px' }} />
  if (item.kind === 'image') return <img src={textFile2} alt="" style={{ width: '16px', height: '16px' }} />
  return <img src={textFile} alt="" style={{ width: '16px', height: '16px' }} />
}

interface FileExplorerProps {
  initialFolder?: string
}

function FileExplorer({ initialFolder }: FileExplorerProps) {
  const { openWindow } = useWindowsStore()
  const { requestTrack } = useMusicStore()
  const defaultFolder = useMemo(() => {
    if (!initialFolder) return 'Projects'
    return folderMap.has(initialFolder) ? initialFolder : 'Projects'
  }, [initialFolder])
  const [activeFolder, setActiveFolder] = useState<string>(defaultFolder)
  const [searchText, setSearchText] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isTreeOpen, setIsTreeOpen] = useState(true)
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const currentFolder = useMemo(
    () => folderMap.get(activeFolder) ?? folderMap.get('Projects')!,
    [activeFolder],
  )
  const filteredItems = useMemo(() => {
    const term = searchText.trim().toLowerCase()
    if (!term) return currentFolder.items
    return currentFolder.items.filter((item) => item.name.toLowerCase().includes(term))
  }, [currentFolder.items, searchText])
  const selectedItem = useMemo(
    () => currentFolder.items.find((item) => item.name === selectedItemName) ?? null,
    [currentFolder.items, selectedItemName],
  )

  useEffect(() => {
    if (!isSearchOpen) return
    searchInputRef.current?.focus()
  }, [isSearchOpen])

  useEffect(() => {
    if (!initialFolder) return
    if (!folderMap.has(initialFolder)) return
    setActiveFolder(initialFolder)
    setSearchText('')
    setIsSearchOpen(false)
  }, [initialFolder])

  useEffect(() => {
    setSelectedItemName(null)
  }, [activeFolder, searchText])

  const toggleSearch = () => {
    setIsSearchOpen((value) => {
      if (value) {
        setSearchText('')
      }
      return !value
    })
  }

  const buttonStyle: React.CSSProperties = {
    width: '22px',
    height: '22px',
    display: 'grid',
    placeItems: 'center',
    padding: 0,
    background: '#dfccd4',
    borderTop: '2px solid #f8eef2',
    borderLeft: '2px solid #f8eef2',
    borderRight: '2px solid #9a8790',
    borderBottom: '2px solid #9a8790',
  }

  return (
    <div style={styles.root}>
      <Frame boxShadow="$out" style={styles.toolbar}>
        <button
          type="button"
          onClick={() => setIsTreeOpen((value) => !value)}
          style={buttonStyle}
          title={isTreeOpen ? 'Hide folder tree' : 'Show folder tree'}
        >
          <img src={folderOpen} alt="" style={{ width: '16px', height: '16px' }} />
        </button>
        <button
          type="button"
          onClick={toggleSearch}
          style={buttonStyle}
          title="Toggle search"
        >
          <img src={search} alt="" style={{ width: '16px', height: '16px' }} />
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveFolder('Projects')
            setSearchText('')
            setIsSearchOpen(false)
          }}
          style={buttonStyle}
          title="Go to My Computer home"
        >
          <img src={thisComputer} alt="" style={{ width: '16px', height: '16px' }} />
        </button>
        {isSearchOpen && (
          <input
            ref={searchInputRef}
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search this folder..."
            style={{
              width: '180px',
              marginLeft: '6px',
              padding: '2px 4px',
              border: '1px solid #97858d',
              background: '#f4ecef',
            }}
          />
        )}
      </Frame>

      <div
        style={{
          ...styles.body,
          gridTemplateColumns: isTreeOpen ? '220px 1fr' : '1fr',
        }}
      >
        {isTreeOpen && (
          <Frame boxShadow="$in" style={styles.pane}>
            <div style={{ ...styles.folderRow, fontWeight: 700 }}>
              <img src={thisComputer} alt="" style={{ width: '16px', height: '16px' }} />
              My Computer
            </div>
            {topLevelFolders.map((folderPath) => {
              const folder = folderMap.get(folderPath)
              if (!folder) return null
              return (
                <div key={folder.path}>
                  <div
                    style={{
                      ...styles.folderRow,
                      background: activeFolder === folder.path ? '#cfb9c3' : 'transparent',
                    }}
                    onClick={() => setActiveFolder(folder.path)}
                  >
                    <img
                      src={activeFolder === folder.path || activeFolder.startsWith(`${folder.path}/`) ? folderOpen : folderClosed}
                      alt=""
                      style={{ width: '16px', height: '16px' }}
                    />
                    {folder.name}
                  </div>
                  {folder.path === 'Projects' && (activeFolder === 'Projects' || activeFolder.startsWith('Projects/')) && (
                    <>
                      {projectSubfolders.map((subfolderPath) => {
                        const subfolder = folderMap.get(subfolderPath)
                        if (!subfolder) return null
                        return (
                          <div
                            key={subfolder.path}
                            style={{
                              ...styles.folderRow,
                              paddingLeft: '26px',
                              background: activeFolder === subfolder.path ? '#cfb9c3' : 'transparent',
                            }}
                            onClick={() => setActiveFolder(subfolder.path)}
                          >
                            <img src={activeFolder === subfolder.path ? folderOpen : folderClosed} alt="" style={{ width: '16px', height: '16px' }} />
                            {subfolder.name}
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              )
            })}
          </Frame>
        )}

        <Frame boxShadow="$in" style={styles.pane}>
          <div style={styles.tableHead}>
            <span>Name</span>
            <span>Size</span>
            <span>Modified</span>
          </div>
          {filteredItems.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 90px 110px',
                padding: '6px 8px',
                background: selectedItemName === item.name ? '#cfb9c3' : 'transparent',
              }}
              onClick={() => setSelectedItemName(item.name)}
              onDoubleClick={() => {
                if (item.kind === 'folder' && item.targetPath) {
                  setActiveFolder(item.targetPath)
                  return
                }
                if (item.kind === 'audio' && item.openWindow) {
                  requestTrack(item.trackName ?? item.name)
                  openWindow(item.openWindow)
                  return
                }
                if (item.openWindow) {
                  openWindow(item.openWindow)
                }
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {iconFor(item)}
                {item.name}
              </span>
              <span>{item.size}</span>
              <span>{item.modified}</span>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div style={{ padding: '8px', color: '#555' }}>No files found.</div>
          )}
        </Frame>
      </div>

      {currentFolder.path === 'Projects' && selectedItem?.kind === 'folder' && selectedItem.preview && (
        <Frame boxShadow="$out" style={{ margin: '0 6px 6px 6px', padding: '6px 8px', background: '#f4ecef' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Preview: {selectedItem.name}</div>
          <div style={{ fontSize: '12px', lineHeight: 1.4 }}>{selectedItem.preview}</div>
        </Frame>
      )}

      <Frame boxShadow="$out" style={styles.status}>
        {currentFolder.items.length} object(s) in {currentFolder.path}
      </Frame>
    </div>
  )
}

export default FileExplorer
