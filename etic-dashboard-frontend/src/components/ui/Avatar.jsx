import { initials } from '../../utils/format.js';

export default function Avatar({ name, className = 'h-10 w-10 bg-amber-400 text-slate-900' }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full text-sm font-bold ${className}`}>
      {initials(name)}
    </span>
  );
}
