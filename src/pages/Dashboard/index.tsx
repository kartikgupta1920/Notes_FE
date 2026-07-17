import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useFetchNotes } from '../../api/Fetch';
import { useNotesMutations } from '../../api/NotesMutations';
import AppContainer from '../../Container/App';
import NoteForm from '../../components/NoteForm';
import NoteCard from '../../components/NoteCard';

export default function Dashboard() {
  const { fetchNotesQuery, isLoading, error } = useFetchNotes();
  const { createNote, editNote, deleteNote } = useNotesMutations();
  const notes = useAppSelector((state: any) => state.notes.items);

  useEffect(() => {
    fetchNotesQuery();
  }, [fetchNotesQuery]);

  return (
    <AppContainer>
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Create a New Note</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <NoteForm onSubmit={createNote} />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Your Notes</h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
          {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
        </span>
      </div>

      {isLoading && <p className="text-slate-500 text-center py-8 font-medium">Loading your notes...</p>}
      {error && <p className="text-red-500 text-center py-8 bg-red-50 rounded-lg">{error}</p>}

      {!isLoading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note : any) => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onUpdate={editNote} 
              onDelete={deleteNote} 
            />
          ))}
          {notes.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 text-lg">You don't have any notes yet.</p>
              <p className="text-slate-400 text-sm mt-1">Create one above to get started!</p>
            </div>
          )}
        </ul>
      )}
    </AppContainer>
  );
}