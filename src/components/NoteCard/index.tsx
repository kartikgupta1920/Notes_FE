import { useState } from 'react';
import type { Note, NoteInput } from '../../types';
import NoteForm from '../NoteForm';
import Button from '../Button';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, values: NoteInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function bodyPreview(body: string, max = 120) {
  return body.length > max ? `${body.slice(0, max)}...` : body;
}

const categoryStyles: Record<string, string> = {
  personal: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  work: 'bg-blue-100 text-blue-800 border-blue-200',
  other: 'bg-slate-100 text-slate-800 border-slate-200',
};

export default function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 h-full transform transition-all">
        <NoteForm
          initialValues={{
            title: note.title,
            body: note.body,
            category: note.category,
            isPinned: note.isPinned,
          }}
          submitLabel="Save changes"
          onCancel={() => setIsEditing(false)}
          onSubmit={async (values) => {
            await onUpdate(note._id, values);
            setIsEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li data-testid={`note-${note._id}`} className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group h-full relative">
      {note.isPinned && (
        <div className="absolute top-5 right-5 text-amber-400 drop-shadow-sm" title="Pinned Note">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      <div className="mb-4 pr-10">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 uppercase tracking-wider ${categoryStyles[note.category] || categoryStyles.other}`}>
          {note.category}
        </span>
        <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2">{note.title}</h3>
      </div>
      
      <p className="text-slate-600 text-sm whitespace-pre-wrap flex-grow mb-6 leading-relaxed">
        {bodyPreview(note.body)}
      </p>
      
      <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
        <time dateTime={note.updatedAt} className="text-xs text-slate-400 font-medium">
          {new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </time>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="ghost" className="!px-3 !py-1 text-xs" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" className="!px-3 !py-1 text-xs" onClick={() => onDelete(note._id)}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}