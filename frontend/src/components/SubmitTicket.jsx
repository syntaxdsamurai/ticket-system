import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function SubmitTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [priority, setPriority] = useState('low');

  const [isDetecting, setIsDetecting] = useState(false);
  const [hasDetected, setHasDetected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/tickets/', {
        title,
        description,
        category,
        priority
      });
      setSuccess(true);
      setTitle('');
      setDescription('');
      setCategory('general');
      setPriority('low');
      setHasDetected(false);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit ticket. Ensure Django is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = async () => {
    if (!description || hasDetected) return;

    setIsDetecting(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tickets/classify/', {
        description: description
      });

      setCategory(response.data.category || 'general');
      setPriority(response.data.priority || 'low');
      setHasDetected(true);
    } catch (error) {
      console.error("Classification error:", error);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-1.5">Submit a request</h1>
        <p className="text-neutral-500 text-sm">Please provide the details of your issue below.</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" /> Ticket successfully created!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-900">Title</label>
          <input
            type="text"
            required
            maxLength={200}
            className="w-full bg-transparent border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all placeholder:text-neutral-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of the issue"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-neutral-900">Description</label>
            {isDetecting && (
              <span className="flex items-center gap-1.5 text-xs text-neutral-500 animate-pulse">
                <Loader2 className="h-3 w-3 animate-spin" /> Auto-routing...
              </span>
            )}
          </div>
          <textarea
            required
            rows={5}
            onBlur={handleBlur}
            className="w-full bg-transparent border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all resize-y placeholder:text-neutral-400"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setHasDetected(false);
            }}
            placeholder="Provide context, steps to reproduce, or error messages..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-900">Category</label>
            <select
              className="w-full bg-transparent border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="account">Account</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-900">Priority</label>
            <select
              className="w-full bg-transparent border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all appearance-none"
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

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}