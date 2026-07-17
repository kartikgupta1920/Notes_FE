import { useState, type CSSProperties } from 'react';
import type { Note, NoteInput } from '../../types';
import NoteForm from '../NoteForm';
import ConfirmDialog from '../ConfirmDialog';
import { PinIcon, EditIcon, TrashIcon } from '../Icons';
import { useToast } from '../Toast';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, values: NoteInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  style?: CSSProperties;
}

function bodyPreview(body: string, max = 140) {
  return body.length > max ? `${body.slice(0, max)}...` : body;
}

const categoryLabel: Record<string, string> = {
  personal: 'badge-personal',
  work: 'badge-work',
  other: 'badge-other',
};

export default function NoteCard({ note, onUpdate, onDelete, style }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(note._id);
      showToast('Note deleted', 'info');
    } catch {
      showToast('Could not delete note', 'error');
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (isEditing) {
    return (
      <li className="note-card animate-scale-in" style={{ ...style, borderColor: 'var(--accent)' }}>
        <NoteForm
          initialValues={{
            title: note.title,
            body: note.body,
            category: note.category,
            isPinned: note.isPinned,
          }}
          submitLabel="Save changes"
          onCancel={() => setIsEditing(false)}
          autoFocus
          onSubmit={async (values) => {
            try {
              await onUpdate(note._id, values);
              showToast('Note updated', 'success');
              setIsEditing(false);
            } catch {
              showToast('Could not update note', 'error');
            }
          }}
        />
      </li>
    );
  }

  return (
    <>
      <li
        data-testid={`note-${note._id}`}
        className={`note-card animate-scale-in ${note.isPinned ? 'is-pinned' : ''}`}
        style={style}
      >
        {note.isPinned && (
          <span className="note-card-pin" title="Pinned note">
            <PinIcon width={20} height={20} />
          </span>
        )}

        <div style={{ paddingRight: note.isPinned ? 32 : 0, marginBottom: 4 }}>
          <span className={`badge ${categoryLabel[note.category] || categoryLabel.other}`} style={{ marginBottom: 12, display: 'inline-flex' }}>
            {note.category}
          </span>
          <h3 className="note-card-title">{note.title}</h3>
        </div>

        <p className="note-card-body">{bodyPreview(note.body)}</p>

        <div className="note-card-footer">
          <time dateTime={note.updatedAt} className="note-card-date">
            {new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
          <div className="note-card-actions">
            <button className="note-card-action" onClick={() => setIsEditing(true)} aria-label="Edit note" title="Edit">
              <EditIcon width={15} height={15} />
            </button>
            <button className="note-card-action is-danger" onClick={() => setConfirmOpen(true)} aria-label="Delete note" title="Delete">
              <TrashIcon width={15} height={15} />
            </button>
          </div>
        </div>
      </li>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this note?"
        description={`"${note.title}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete note"
        isLoading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
