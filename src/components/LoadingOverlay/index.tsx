export default function LoadingOverlay() {
  return (
    <div className="modal-overlay" style={{ background: 'var(--bg)' }}>
      <div className="stack" style={{ alignItems: 'center', gap: 16 }}>
        <div className="brand-mark" style={{ width: 52, height: 52, animation: 'pulse-ring 1.6s ease-out infinite' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4Z" />
            <path d="M4 4v17M8 8h7M8 12h7M8 16h4" />
          </svg>
        </div>
        <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 13.5 }}>Loading&hellip;</p>
      </div>
    </div>
  );
}
