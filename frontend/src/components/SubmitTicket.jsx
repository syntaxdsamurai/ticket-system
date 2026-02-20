import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function SubmitTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { title, description, category, priority });
    alert("UI looks great! Backend connection coming soon.");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit a Support Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            required
            maxLength={200}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of the issue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please describe your problem in detail..."
          />
          <div className="flex justify-end mt-2">
            <button type="button" className="text-sm text-blue-600 flex items-center gap-1 hover:text-blue-800 font-medium">
              <Sparkles className="h-4 w-4" /> Auto-Categorize with AI
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="account">Account</option>
              <option value="general">General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 bg-white outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
        >
          <Send className="h-4 w-4" /> Submit Ticket
        </button>
      </form>
    </div>
  );
}