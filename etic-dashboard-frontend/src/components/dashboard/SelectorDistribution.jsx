import SectionCard from '../ui/SectionCard.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { percent } from '../../utils/format.js';

export default function SelectorDistribution({ selectors }) {
  const total = selectors.length;
  const rows = [
    { label: 'Technique', count: selectors.filter((s) => s.type === 'TECHNICAL').length, color: 'red', text: 'text-red-600' },
    { label: 'RH', count: selectors.filter((s) => s.type === 'RH').length, color: 'yellow', text: 'text-emerald-600' },
  ];
  return (
    <SectionCard title="Répartition des sélecteurs" icon="chart">
      <div className="space-y-5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{r.label} <span className="text-slate-400">({r.count} sur {total})</span></span>
              <span className={`font-bold ${r.text}`}>{percent(r.count, total)} %</span>
            </div>
            <ProgressBar value={percent(r.count, total)} color={r.color} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
