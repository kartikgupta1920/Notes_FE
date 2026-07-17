import { useEffect } from 'react';
import { AlertTriangleIcon } from '../Icons';
import Button from '../Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal-card" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="modal-icon">
          <AlertTriangleIcon />
        </div>
        <h2 id="confirm-title" className="modal-title">{title}</h2>
        {description && <p className="modal-desc">{description}</p>}
        <div className="modal-actions">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
