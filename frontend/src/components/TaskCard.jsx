const statusColor = {
  todo: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-yellow-100 text-yellow-700',
  done: 'bg-green-100 text-green-700',
};

const priorityColor = {
  low: 'bg-blue-100 text-blue-700',
  medium: 'bg-orange-100 text-orange-700',
  high: 'bg-red-100 text-red-700',
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3
          className={`font-semibold leading-snug ${
            task.status === 'done' ? 'line-through text-slate-400' : ''
          }`}
        >
          {task.title}
        </h3>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-medium ${statusColor[task.status]}`}>
            {task.status}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-medium ${priorityColor[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="text-xs text-slate-400 mb-3">
        Created {new Date(task.createdAt).toLocaleDateString()}
      </div>

      <div className="flex gap-2">
        <button onClick={() => onToggle(task)} className="btn-secondary text-xs">
          {task.status === 'done' ? 'Reopen' : 'Mark Done'}
        </button>
        <button onClick={() => onEdit(task)} className="btn-secondary text-xs">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn-danger text-xs ml-auto">
          Delete
        </button>
      </div>
    </div>
  );
}