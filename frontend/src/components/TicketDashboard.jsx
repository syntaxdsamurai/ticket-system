import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TicketDashboard() {
  const [stats, setStats] = useState({ total_tickets: 0, open_tickets: 0, critical_tickets: 0, avg_per_day: 0 });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, ticketsRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/tickets/stats/'),
        axios.get('http://127.0.0.1:8000/api/tickets/')
      ]);
      setStats(statsRes.data);
      setTickets(ticketsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-neutral-500 mt-20">Loading metrics...</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 ease-out">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-1.5">Overview</h1>
        <p className="text-neutral-500 text-sm">System metrics and active support tickets.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Tickets" value={stats.total_tickets} />
        <StatCard title="Open" value={stats.open_tickets} />
        <StatCard title="Critical" value={stats.critical_tickets} />
        <StatCard title="Avg / Day" value={stats.avg_per_day} />
      </div>

      {/* Ticket Table */}
      <div>
        <h2 className="text-sm font-medium text-neutral-900 mb-4">Recent Activity</h2>
        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Priority</th>
                <th className="px-6 py-3 font-medium">Category</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-neutral-400">
                    No tickets found. Submit one to see it here!
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-neutral-900">{ticket.title}</td>
                    <td className="px-6 py-4 capitalize">{ticket.status.replace('_', ' ')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        ticket.priority === 'critical' ? 'bg-rose-100 text-rose-700' : 
                        ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' : 
                        'bg-neutral-100 text-neutral-700'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize">{ticket.category}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-5 border border-neutral-200 rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <h3 className="text-neutral-500 text-xs font-medium mb-2 uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-semibold text-neutral-900">{value}</p>
    </div>
  );
}