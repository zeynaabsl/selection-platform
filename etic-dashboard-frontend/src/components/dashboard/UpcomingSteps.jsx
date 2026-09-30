import SectionCard from '../ui/SectionCard.jsx';

const STATUS = {
  closing_soon: { dot: 'bg-red-600', badge: 'bg-red-100 text-red-600' },
  planned: { dot: 'bg-amber-400', badge: 'bg-amber-100 text-amber-600' },
  upcoming: { dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-600' },
};

export default function UpcomingSteps({ steps }) {
  return (
    <SectionCard title="Prochaines étapes" icon="calendar">
      <ol className="space-y-5 border-l-2 border-slate-200 pl-6">
        {steps.map((s) => (
          <li key={s.id} className="relative">
            <span className={`absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-white ${STATUS[s.status].dot}`} />
            <p className="font-bold">{s.label}</p>
            <p className="text-sm text-slate-400">{s.dateLabel}</p>
            <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-bold ${STATUS[s.status].badge}`}>{s.statusLabel}</span>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
