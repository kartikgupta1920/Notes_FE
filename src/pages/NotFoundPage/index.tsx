import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { SearchIcon } from '../../components/Icons';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <div className="empty-state-icon" style={{ animation: 'none', marginBottom: 22 }}>
        <SearchIcon width={28} height={28} />
      </div>
      <div className="notfound-code">404</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginTop: 10 }}>Page not found</h2>
      <p style={{ color: 'var(--text-faint)', marginTop: 10, maxWidth: 380 }}>
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/" style={{ marginTop: 26 }}>
        <Button variant="primary">Return to Dashboard</Button>
      </Link>
    </div>
  );
}
