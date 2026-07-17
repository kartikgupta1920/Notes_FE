import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useFetchNotes } from '../../api/Fetch';
import { useNotesMutations } from '../../api/NotesMutations';
import AppContainer from '../../Container/App';
import NoteForm from '../../components/NoteForm';
import NoteCard from '../../components/NoteCard';
import EmptyState from '../../components/EmptyState';
import { NoteGridSkeleton } from '../../components/Skeleton';
import { useToast } from '../../components/Toast';
import { SearchIcon, XIcon, AlertCircleIcon } from '../../components/Icons';
import type { Note, NoteCategory } from '../../types';

type CategoryFilter = 'all' | NoteCategory;

export default function Dashboard() {
  const { fetchNotesQuery, isLoading, error } = useFetchNotes();
  const { createNote, editNote, deleteNote } = useNotesMutations();
  const notes = useAppSelector((state: any) => state.notes.items) as Note[];
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  useEffect(() => {
    fetchNotesQuery();
  }, [fetchNotesQuery]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = notes.filter((note) => {
      const matchesSearch = !q || note.title.toLowerCase().includes(q) || note.body.toLowerCase().includes(q);
      const matchesCategory = category === 'all' || note.category === category;
      return matchesSearch && matchesCategory;
    });
    return [...filtered].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes, search, category]);

  const handleCreate = async (values: Parameters<typeof createNote>[0]) => {
    try {
      await createNote(values);
      showToast('Note created', 'success');
    } catch {
      showToast('Could not create note', 'error');
    }
  };

  return (
    <AppContainer>
      <div className="stack" style={{ gap: 36 }}>
        <section className="stack" style={{ gap: 14 }}>
          <h2 className="section-title">Create a new note</h2>
          <div className="surface" style={{ padding: 24 }}>
            <NoteForm onSubmit={handleCreate} />
          </div>
        </section>

        <section className="stack" style={{ gap: 18 }}>
          <div className="page-header">
            <div className="row" style={{ gap: 10 }}>
              <h2 className="section-title">Your notes</h2>
              {!isLoading && <span className="count-pill">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>}
            </div>

            <div className="searchbar">
              <SearchIcon width={16} height={16} />
              <input
                className="input"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search notes"
              />
              {search && (
                <button className="searchbar-clear" onClick={() => setSearch('')} aria-label="Clear search">
                  <XIcon width={13} height={13} />
                </button>
              )}
            </div>
          </div>

          <div className="chip-row">
            {(['all', 'personal', 'work', 'other'] as CategoryFilter[]).map((c) => (
              <button
                key={c}
                className={`chip ${category === c ? 'is-active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {isLoading && <NoteGridSkeleton />}

          {error && (
            <div className="banner-error">
              <AlertCircleIcon width={17} height={17} />
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <ul className="note-grid">
              {filteredNotes.map((note, i) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onUpdate={editNote}
                  onDelete={deleteNote}
                  style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
                />
              ))}
              {filteredNotes.length === 0 && notes.length > 0 && (
                <EmptyState variant="no-results" onClearFilters={() => { setSearch(''); setCategory('all'); }} />
              )}
              {notes.length === 0 && <EmptyState variant="no-notes" />}
            </ul>
          )}
        </section>
      </div>
    </AppContainer>
  );
}
