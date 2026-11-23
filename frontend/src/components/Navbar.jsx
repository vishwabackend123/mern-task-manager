import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-brand-600 flex items-center gap-2">
          <span>✅</span> TaskManager
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:inline">
                Hi, <strong>{user.name}</strong>
              </span>
              <button onClick={handleLogout} className="btn-danger text-xs">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-600 hover:text-brand-600">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-xs">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}