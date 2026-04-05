import crestPaper from '../assets/projects/CREST_paper.pdf'

function ProjectPdfViewer() {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%', gap: '8px' }}>
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
        3D_Reconstruction_paper.pdf
      </div>
      <div style={{ height: '100%', minHeight: 0 }}>
        <iframe
          title="3D Reconstruction paper"
          src={crestPaper}
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid #9d8a93',
            background: '#fff',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  )
}

export default ProjectPdfViewer
