function MyoAmpOverview() {
  return (
    <div style={{ display: 'grid', gap: '10px', lineHeight: 1.5 }}>
      <h3 style={{ margin: 0 }}>MyoAmp Project Overview</h3>
      <p style={{ margin: 0 }}>
        MyoAmp is designed to support rehabilitation by translating muscle activity into interpretable, real-time feedback, particularly for recovering stroke patients. By capturing EMG signals and processing them into meaningful patterns, the system helps patients and clinicians better understand muscle activation and progress during recovery. The integration of temporal modeling (via TDNN) enables detection of subtle activation patterns that may not be immediately visible, making it useful for guiding therapy, tracking improvement, and potentially enabling assistive control interfaces. Overall, MyoAmp serves as a bridge between raw bio-signals and actionable insight in neurorehabilitation contexts.
      </p>
      <p style={{ margin: 0 }}>
        MyoAmp is an end-to-end EMG sensing system I developed, with a primary focus on the software pipeline for real-time bio-signal analysis. I built a full processing stack that takes in streamed EMG data from a microcontroller and performs signal conditioning, filtering, and feature extraction to produce meaningful representations of muscle activity. On top of this, I implemented a time-delay neural network (TDNN) to model temporal patterns in EMG signals, enabling more robust recognition of muscle activations over time. I developed tools for real-time visualization and debugging, allowing rapid iteration on model performance and signal quality. While I also contributed to the embedded firmware and hardware interfacing, the core of my work centered on designing and optimizing the software system ensuring low-latency streaming, reliable preprocessing, and effective temporal learning for downstream interpretation.
      </p>
    </div>
  )
}

export default MyoAmpOverview
