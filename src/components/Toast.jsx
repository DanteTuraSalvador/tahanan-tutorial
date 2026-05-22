import { IconCheck, IconClose } from './Icons.jsx';

export default function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <div className={`toast ${toast.kind || 'success'}`}>
        <span className="toast-ico"><IconCheck width={14} height={14} /></span>
        <span>{toast.message}</span>
        <button className="toast-close" onClick={onDismiss} aria-label="Dismiss notification">
          <IconClose width={12} height={12} />
        </button>
      </div>
    </div>
  );
}
