import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubmitTicket from './components/SubmitTicket';
import TicketDashboard from './components/TicketDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Routes>
          <Route path="/" element={<SubmitTicket />} />
          <Route path="/dashboard" element={<TicketDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;