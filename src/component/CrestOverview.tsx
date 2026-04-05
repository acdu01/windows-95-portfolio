function CrestOverview() {
  return (
    <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
      <h3 style={{ margin: 0 }}>3D Reconstruction Project Overview</h3>
      <p style={{ margin: 0 }}>
        My 3D reconstruction project focuses on reconstructing 3D structure from challenging underwater imagery, particularly around hydrothermal vent environments where visibility is severely degraded by scattering, attenuation, and visual noise. I developed a depth-informed preprocessing pipeline that integrates monocular depth estimation (Depth Anything) with spatially adaptive transformations to suppress unreliable distant features and emphasize stable foreground structure. Building on this, I evaluated feature extraction methods, comparing classical SIFT with a transformer-based detector (RDD), and used COLMAP (via pycolmap) to generate and analyze sparse 3D reconstructions. I introduced both image quality metrics and reconstruction metrics to systematically assess performance across varying conditions.
      </p>
      <p style={{ margin: 0 }}>
        I am the first author of this work, which has been accepted to IEEE OCEANS 2026. My contributions span the full pipeline, from designing preprocessing methods and running large-scale reconstruction experiments to analyzing results and leading the writing and presentation of the research. The project demonstrates that depth-informed preprocessing and learned feature extractors can significantly improve reconstruction robustness in low-quality underwater data, with broader implications for scalable ocean mapping and scientific exploration.
      </p>
    </div>
  )
}

export default CrestOverview
