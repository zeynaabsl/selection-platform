import StatisticCard from './StatisticCard.jsx';
import RecentEvaluations from './RecentEvaluations.jsx';
import SectionCard from '../ui/SectionCard.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { percent } from '../../utils/format.js';

export default function DashboardSelector({ data }) {
  const { event, selector, stats: s, recentEvaluations } = data;
  const pct = percent(s.evaluated, s.assigned);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold uppercase">{event.name}</h1>
        <p className="text-sm text-slate-400">{selector.name} — sélecteur {selector.type === 'RH' ? 'RH' : 'Technique'}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatisticCard label="Assignées" value={s.assigned} icon="file" tone="green" />
        <StatisticCard label="Évaluées" value={s.evaluated} icon="check" tone="teal" />
        <StatisticCard label="Restantes" value={s.remaining} icon="clock" tone="yellow" />
      </div>

      <SectionCard title="Ma progression" icon="chart">
        <div className="mb-2 flex justify-between text-sm">
          <span>{s.evaluated} / {s.assigned} candidatures évaluées</span>
          <span className="font-bold">{pct} %</span>
        </div>
        <ProgressBar value={pct} />
      </SectionCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatisticCard label="Acceptées" value={s.accepted} icon="check" />
        <StatisticCard label="Rejetées" value={s.rejected} icon="xcircle" />
        <StatisticCard label="En attente" value={s.pending} icon="clock" />
      </div>

      <RecentEvaluations items={recentEvaluations} />
    </div>
  );
}
