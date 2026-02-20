import { Link } from 'react-router-dom';
import { Ticket, BarChart3 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-5xl h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Ticket className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-gray-900">AI Support Desk</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
            <Ticket className="h-4 w-4" /> Submit Ticket
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}