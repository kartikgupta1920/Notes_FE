export default function NoteCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ width: 70, height: 18, borderRadius: 999 }} />
      <div className="skeleton" style={{ width: '85%', height: 16 }} />
      <div className="skeleton" style={{ width: '55%', height: 16 }} />
      <div style={{ flexGrow: 1 }} />
      <div className="skeleton" style={{ width: '100%', height: 12 }} />
      <div className="skeleton" style={{ width: '70%', height: 12 }} />
    </div>
  );
}

export function NoteGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="note-grid">
      {Array.from({ length: count }).map((_, i) => (
        <NoteCardSkeleton key={i} />
      ))}
    </div>
  );
}
