import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <div className="text-7xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold mb-2">404 — Page Not Found</h1>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}