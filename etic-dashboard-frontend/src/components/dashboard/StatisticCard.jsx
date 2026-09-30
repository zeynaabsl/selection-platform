import Icon from '../ui/Icon.jsx';

const TONES = {
  green: { card: 'bg-white text-slate-900', icon: 'bg-emerald-500 text-white', label: 'text-slate-400', foot: 'text-emerald-600' },
  yellow: { card: 'bg-white text-slate-900', icon: 'bg-amber-400 text-white', label: 'text-slate-400', foot: 'text-amber-500' },
  red: { card: 'bg-gradient-to-br from-red-600 to-rose-500 text-white', icon: 'bg-white/25', label: 'text-white/80', foot: 'text-white/90' },
  teal: { card: 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white', icon: 'bg-white/25', label: 'text-white/80', foot: 'text-white/90' },
  neutral: { card: 'bg-white text-slate-900', icon: 'bg-slate-100 text-slate-600', label: 'text-slate-400', foot: 'text-slate-400' },
};

export default function StatisticCard({ label, value, icon, tone = 'neutral', footer }) {
  const t = TONES[tone];
  return (
    <div className={`rounded-2xl p-5 shadow-sm ${t.card}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.icon}`}><Icon name={icon} /></span>
        <span className={`text-sm font-semibold ${t.label}`}>{label}</span>
      </div>
      <p className="mt-4 text-3xl font-extrabold">{value}</p>
      {footer && <p className={`mt-1 text-xs font-medium ${t.foot}`}>{footer}</p>}
    </div>
  );
}
