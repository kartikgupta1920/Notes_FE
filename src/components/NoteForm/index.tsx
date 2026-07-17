import React, { useState } from 'react';
import type { NoteCategory, NoteInput } from '../../types';
import TextInput from '../InputTypes/TestInput';
import TextArea from '../InputTypes/TextArea';
import Select from '../InputTypes/Select';
import Checkbox from '../InputTypes/Checkbox';
import Button from '../Button';

interface NoteFormProps {
  initialValues?: NoteInput;
  submitLabel?: string;
  onSubmit: (values: NoteInput) => Promise<void>;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const defaultValues: NoteInput = {
  title: '',
  body: '',
  category: 'other',
  isPinned: false,
};

const TITLE_MAX = 80;
const BODY_MAX = 2000;

export default function NoteForm({
  initialValues = defaultValues,
  submitLabel = 'Add note',
  onSubmit,
  onCancel,
  autoFocus = false,
}: NoteFormProps) {
  const [values, setValues] = useState<NoteInput>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const titleError = touched && !values.title.trim() ? 'Title is required' : undefined;
  const bodyError = touched && !values.body.trim() ? 'Body is required' : undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!values.title.trim() || !values.body.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
      if (!onCancel) {
        setValues(defaultValues);
        setTouched(false);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="note-form" className="stack" style={{ gap: 18 }}>
      <TextInput
        id="title"
        label="Title"
        value={values.title}
        onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
        maxLength={TITLE_MAX}
        error={titleError}
        placeholder="E.g., Project Roadmap"
        autoFocus={autoFocus}
      />

      <TextArea
        id="body"
        label="Body"
        value={values.body}
        onChange={(e) => setValues((v) => ({ ...v, body: e.target.value }))}
        maxLength={BODY_MAX}
        error={bodyError}
        placeholder="Write your note details here..."
      />

      <div className="row" style={{ gap: 20, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div className="row" style={{ gap: 24, flexWrap: 'wrap' }}>
          <Select
            id="category"
            label="Category"
            value={values.category}
            onChange={(e) => setValues((v) => ({ ...v, category: e.target.value as NoteCategory }))}
            options={[
              { value: 'personal', label: 'Personal' },
              { value: 'work', label: 'Work' },
              { value: 'other', label: 'Other' },
            ]}
          />

          <Checkbox
            id="isPinned"
            label="Pin to top"
            checked={values.isPinned}
            onChange={(e) => setValues((v) => ({ ...v, isPinned: e.target.checked }))}
          />
        </div>

        <div className="row" style={{ gap: 10, marginLeft: 'auto' }}>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={submitting}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
