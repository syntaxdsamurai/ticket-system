import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubmitTicket from './components/SubmitTicket';
import TicketDashboard from './components/TicketDashboard';

function App() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans antialiased selection:bg-neutral-200">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-16 max-w-4xl">
        <Routes>
          <Route path="/" element={<SubmitTicket />} />
          <Route path="/dashboard" element={<TicketDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;