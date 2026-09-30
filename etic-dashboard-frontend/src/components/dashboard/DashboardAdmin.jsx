import StatisticCard from './StatisticCard.jsx';
import SelectorProgress from './SelectorProgress.jsx';
import SelectorDistribution from './SelectorDistribution.jsx';
import PendingCandidates from './PendingCandidates.jsx';
import UpcomingSteps from './UpcomingSteps.jsx';
import SectionCard from '../ui/SectionCard.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { percent } from '../../utils/format.js';

function LabeledBar({ label, done, total, color }) {
  const pct = percent(done, total);
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label} <span className="text-slate-400">({done} / {total})</span></span>
        <span className="font-bold">{pct} %</span>
      </div>
      <ProgressBar value={pct} color={color} />
    </div>
  );
}

export default function DashboardAdmin({ data }) {
  const { event, candidateStats: c, evaluationStats: e, quota, selectorProgress, pendingCandidates, upcomingSteps } = data;
  const base = `/events/${event.id}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold uppercase">{event.name}</h1>
        <p className="text-sm text-slate-400">{event.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticCard label="Affectées" value={c.assigned} icon="users" tone="green" footer={`sur ${c.total} candidatures`} />
        <StatisticCard label="Places restantes" value={quota.remaining} icon="grid" tone="yellow" footer={`Quota : ${quota.total} places`} />
        <StatisticCard label="Refusées" value={c.rejected} icon="xcircle" tone="red" />
        <StatisticCard label="En attente" value={c.pending} icon="clock" tone="teal" footer="En cours" />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatisticCard label="Total" value={c.total} icon="file" />
        <StatisticCard label="Évaluées" value={c.fullyEvaluated} icon="check" footer="complètement" />
        <StatisticCard label="Restantes" value={c.remaining} icon="clock" />
        <StatisticCard label="Acceptées" value={c.accepted} icon="check" />
        <StatisticCard label="Évaluations restantes" value={e.remaining} icon="chart" />
        <StatisticCard label="Quota" value={`${c.accepted} / ${quota.total}`} icon="grid" footer="acceptées / places" />
      </div>

      <SectionCard title="Progression globale" icon="chart">
        <div className="space-y-5">
          <LabeledBar label="Candidatures évaluées" done={c.fullyEvaluated} total={c.total} />
          <LabeledBar label="Évaluations RH" done={e.rh.done} total={e.rh.required} color="yellow" />
          <LabeledBar label="Évaluations Technique" done={e.technical.done} total={e.technical.required} color="red" />
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <SelectorProgress selectors={selectorProgress} moreTo={`${base}/selectors`} />
          <UpcomingSteps steps={upcomingSteps} />
        </div>
        <div className="space-y-6 xl:col-span-2">
          <SelectorDistribution selectors={selectorProgress} />
          <PendingCandidates candidates={pendingCandidates} moreTo={`${base}/candidates`} />
        </div>
      </div>
    </div>
  );
}
