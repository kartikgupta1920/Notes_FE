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
}

const defaultValues: NoteInput = {
  title: '',
  body: '',
  category: 'other',
  isPinned: false,
};

export default function NoteForm({
  initialValues = defaultValues,
  submitLabel = 'Add note',
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [values, setValues] = useState<NoteInput>(initialValues);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(values);
      if (!onCancel) setValues(defaultValues);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="note-form" className="flex flex-col gap-5">
      <TextInput
        id="title"
        label="Title"
        value={values.title}
        onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
        required
        placeholder="E.g., Project Roadmap"
      />

      <TextArea
        id="body"
        label="Body"
        value={values.body}
        onChange={(e) => setValues((v) => ({ ...v, body: e.target.value }))}
        required
        placeholder="Write your note details here..."
      />

      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between pt-2">
        <div className="flex flex-wrap items-center gap-6">
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

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel} className="flex-1 sm:flex-none">
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={submitting} className="flex-1 sm:flex-none">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}