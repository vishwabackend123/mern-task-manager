export default function StatsBar({ stats }) {
  const counts = {
    todo: 0,
    'in-progress': 0,
    done: 0,
  };
  stats?.forEach((s) => {
    counts[s._id] = s.count;
  });

  const items = [
    { label: 'To Do', value: counts.todo, color: 'bg-slate-100 text-slate-700' },
    { label: 'In Progress', value: counts['in-progress'], color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Done', value: counts.done, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {items.map((it) => (
        <div key={it.label} className={`rounded-lg p-4 ${it.color}`}>
          <div className="text-2xl font-bold">{it.value}</div>
          <div className="text-xs uppercase tracking-wide opacity-80">{it.label}</div>
        </div>
      ))}
    </div>
  );
}