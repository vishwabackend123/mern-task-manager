export default function EmptyState({ title = 'Nothing here yet', message, action }) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-3">📋</div>
      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
      {message && <p className="text-sm text-slate-500 mt-1">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}