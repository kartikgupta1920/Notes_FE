import { NotebookIcon, SearchIcon } from '../Icons';

interface EmptyStateProps {
  variant?: 'no-notes' | 'no-results';
  onClearFilters?: () => void;
}

export default function EmptyState({ variant = 'no-notes', onClearFilters }: EmptyStateProps) {
  if (variant === 'no-results') {
    return (
      <div className="empty-state animate-fade-up">
        <div className="empty-state-icon"><SearchIcon width={28} height={28} /></div>
        <h3>No notes match your search</h3>
        <p>Try a different keyword or clear your filters.</p>
        {onClearFilters && (
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 16 }} onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="empty-state animate-fade-up">
      <div className="empty-state-icon"><NotebookIcon width={28} height={28} /></div>
      <h3>You don't have any notes yet</h3>
      <p>Create one above to get started!</p>
    </div>
  );
}
