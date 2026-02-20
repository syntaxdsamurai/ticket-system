import { Link, useLocation } from 'react-router-dom';
import { Command } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/60">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-4xl">
        <div className="flex items-center gap-2.5">
          <div className="bg-neutral-900 p-1 rounded-md">
            <Command className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-sm text-neutral-900">Support Desk</span>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors ${isActive('/') ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
          >
            New Request
          </Link>
          <Link
            to="/dashboard"
            className={`transition-colors ${isActive('/dashboard') ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}