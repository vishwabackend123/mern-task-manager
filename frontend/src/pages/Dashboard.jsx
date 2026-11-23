import { useEffect, useMemo, useState } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  fetchStats,
} from '../api/taskApi.js';
import TaskCard from '../components/TaskCard.jsx';
import TaskForm from '../components/TaskForm.jsx';
import StatsBar from '../components/StatsBar.jsx';
import Loader from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({ status: '', search: '' });
  const [error, setError] = useState('');

  const loadAll = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.search) params.search = filter.search;
      const [tasksRes, statsRes] = await Promise.all([fetchTasks(params), fetchStats()]);
      setTasks(tasksRes.data.data.tasks);
      setStats(statsRes.data.data.stats);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(loadAll, filter.search ? 300 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.status, filter.search]);

  const handleCreate = async (data) => {
    await createTask(data);
    setShowForm(false);
    await loadAll();
  };

  const handleUpdate = async (data) => {
    await updateTask(editing._id, data);
    setEditing(null);
    await loadAll();
  };

  const handleToggle = async (task) => {
    const next = task.status === 'done' ? 'todo' : 'done';
    await updateTask(task._id, { status: next });
    await loadAll();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    await loadAll();
  };

  const filteredTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + New Task
        </button>
      </div>

      <StatsBar stats={stats} />

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="input sm:max-w-xs"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="input sm:max-w-[160px]"
        >
          <option value="">All statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {(showForm || editing) && (
        <div className="mb-6">
          <TaskForm
            initial={editing || undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4">{error}</div>}

      {loading ? (
        <Loader text="Loading tasks..." />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          message={filter.search || filter.status ? 'Try changing filters' : 'Create your first task to get started'}
          action={
            !filter.search &&
            !filter.status && (
              <button onClick={() => setShowForm(true)} className="btn-primary">
                + Create Task
              </button>
            )
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onEdit={(t) => {
                setEditing(t);
                setShowForm(false);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}