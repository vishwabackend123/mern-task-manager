import { useState } from 'react';

const emptyForm = { title: '', description: '', status: 'todo', priority: 'medium' };

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    setSaving(true);
    try {
      await onSubmit(form);
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-3">
      <h3 className="font-semibold text-slate-700">
        {initial ? 'Edit Task' : 'New Task'}
      </h3>

      {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}

      <input
        name="title"
        placeholder="Task title *"
        value={form.title}
        onChange={handleChange}
        className="input"
        maxLength={120}
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={2}
        className="input resize-none"
        maxLength={1000}
      />

      <div className="grid grid-cols-2 gap-2">
        <select name="status" value={form.status} onChange={handleChange} className="input">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange} className="input">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : initial ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}