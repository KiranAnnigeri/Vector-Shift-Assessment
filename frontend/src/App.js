// App.js

import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineCanvas } from './components/PipelineCanvas';
import { SubmitButton } from './components/SubmitButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastContainer } from './components/Toast';

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <div className="app-container">
        {/* ── Top Header ── */}
        <header className="app-header">
          {/* Logo mark */}
          <div className="app-logo">VS</div>
          <div>
            <div className="app-title">VectorShift</div>
            <div className="app-subtitle">PIPELINE BUILDER</div>
          </div>
          <div className="app-hint">
            Drag nodes from the palette below
          </div>
        </header>

        {/* ── Toolbar (node palette) ── */}
        <PipelineToolbar />

        {/* ── Canvas ── */}
        <div className="app-canvas-wrapper">
          <PipelineCanvas />
        </div>

        {/* ── Submit ── */}
        <SubmitButton />
      </div>
    </ErrorBoundary>
  );
}

export default App;
