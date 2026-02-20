export default function TicketDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Tickets</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Open Tickets</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Avg Tickets / Day</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
        </div>
      </div>

      {/* Ticket List Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[300px] flex items-center justify-center text-gray-500">
        Ticket list will appear here once connected to Django backend.
      </div>
    </div>
  );
}