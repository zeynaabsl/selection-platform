import SectionCard from '../ui/SectionCard.jsx';
import Avatar from '../ui/Avatar.jsx';

const DECISIONS = {
  ACCEPTED: { label: 'Accepté', badge: 'bg-emerald-100 text-emerald-600' },
  PENDING: { label: 'En attente', badge: 'bg-amber-100 text-amber-600' },
  REJECTED: { label: 'Rejeté', badge: 'bg-red-100 text-red-600' },
};
const formatDate = (iso) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(new Date(iso));

export default function RecentEvaluations({ items }) {
  return (
    <SectionCard title="Dernières candidatures évaluées" icon="check">
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">Tu n’as pas encore évalué de candidature.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((e) => (
            <li key={e.id} className="flex items-center gap-3 py-3">
              <Avatar name={e.candidateName} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{e.candidateName}</p>
                <p className="text-xs text-slate-400">{formatDate(e.evaluatedAt)}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${DECISIONS[e.decision].badge}`}>{DECISIONS[e.decision].label}</span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
