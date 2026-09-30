import { Link } from 'react-router-dom';
import SectionCard from '../ui/SectionCard.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import Avatar from '../ui/Avatar.jsx';
import { percent } from '../../utils/format.js';

export default function PendingCandidates({ candidates, moreTo }) {
  return (
    <SectionCard title="Candidatures en attente" icon="user"
      action={<Link to={moreTo} className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-teal-600 hover:bg-slate-50">Voir plus</Link>}>
      {candidates.length === 0 ? (
        <p className="text-sm text-slate-400">Aucune candidature en attente.</p>
      ) : (
        <>
          <div className="mb-2 flex justify-between border-b border-slate-200 pb-2 text-xs font-semibold text-slate-400">
            <span>Nom</span><span>État</span>
          </div>
          <ul className="space-y-3">
            {candidates.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <Avatar name={c.fullName} />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.fullName}</span>
                <div className="w-24 sm:w-36">
                  <ProgressBar value={percent(c.evaluationsDone, c.evaluationsRequired)} />
                  <p className="mt-1 text-right text-[11px] text-slate-400">{c.evaluationsDone} / {c.evaluationsRequired} évaluations</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </SectionCard>
  );
}
