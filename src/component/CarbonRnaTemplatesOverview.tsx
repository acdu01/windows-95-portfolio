function CarbonRnaTemplatesOverview() {
  return (
    <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
      <h3 style={{ margin: 0 }}>RNA Templates Project Overview</h3>
      <p style={{ margin: 0 }}>
        This project investigates the role of carbonaceous materials—specifically diamond-like carbon (DLC)—as potential templates for abiotic RNA oligomer formation, contributing to broader questions around the RNA World hypothesis and the origins of life. Using CHARMM molecular dynamics simulations, I studied how the heterogeneous structure and surface properties of DLC influence key molecular interactions such as oligomer attachment, translocation, and elongation. To address the computational constraints of large-scale MD simulations, I developed an AI-assisted pipeline that combines lightweight Polychrom/OpenMM simulations with a transformer-based model to optimize initial conditions and increase the likelihood of observing meaningful interactions. Across experiments, I identified qualitative interaction regimes—including van der Waals binding, bridging, and detachment—that support the plausibility of carbonaceous surfaces as catalytic templates for prebiotic polymer formation.
      </p>
      <p style={{ margin: 0 }}>
        More broadly, this work proposes heterogeneous carbon substrates as a compelling alternative to traditionally studied mineral templates like clays. By integrating molecular simulation with machine learning–driven parameter optimization, the project demonstrates a scalable approach to exploring complex prebiotic systems. This research was recognized with the Davidson Fellows Scholarship and selected as a Regeneron Science Talent Search Top 300 Scholar, reflecting both its technical depth and its potential impact on understanding the chemical pathways underlying the emergence of life.
      </p>
    </div>
  )
}

export default CarbonRnaTemplatesOverview
