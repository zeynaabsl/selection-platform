import { Link } from 'react-router-dom';
import SectionCard from '../ui/SectionCard.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import Avatar from '../ui/Avatar.jsx';
import { percent } from '../../utils/format.js';

const TYPES = {
  RH: { label: 'RH', badge: 'bg-amber-100 text-amber-600', bar: 'yellow' },
  TECHNICAL: { label: 'Technique', badge: 'bg-red-100 text-red-600', bar: 'red' },
};

export default function SelectorProgress({ selectors, moreTo }) {
  return (
    <SectionCard title="Sélecteurs" icon="users"
      action={<Link to={moreTo} className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-teal-600 hover:bg-slate-50">Voir plus</Link>}>
      <ul className="divide-y divide-slate-100">
        {selectors.map((s) => {
          const type = TYPES[s.type];
          const pct = percent(s.done, s.assigned);
          return (
            <li key={s.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
              <Avatar name={s.name} className="h-9 w-9 bg-slate-100 text-slate-700" />
              <div className="min-w-0 flex-1 basis-40">
                <p className="truncate text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-slate-400">{s.done} / {s.assigned} évaluations</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${type.badge}`}>{type.label}</span>
              <div className="flex w-full items-center gap-3 sm:w-48">
                <ProgressBar value={pct} color={type.bar} />
                <span className="w-10 text-right text-xs font-bold">{pct} %</span>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
