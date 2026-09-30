const COLORS = { green: 'bg-emerald-500', yellow: 'bg-amber-400', red: 'bg-red-500' };

export default function ProgressBar({ value, color = 'green', className = '' }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div className={`h-full rounded-full transition-all ${COLORS[color]}`} style={{ width: `${v}%` }} />
    </div>
  );
}
