import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';

const NAV = {
  ADMIN: [
    { to: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: 'selectors', label: 'Sélecteurs', icon: 'users' },
    { to: 'candidates', label: 'Candidatures', icon: 'file' },
  ],
  SELECTOR: [
    { to: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { to: 'candidates', label: 'Mes candidatures', icon: 'file' },
  ],
};

export default function Sidebar({ role, open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white p-5 shadow-lg transition-transform lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:translate-x-0 lg:rounded-3xl lg:shadow-sm ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-[10px] font-extrabold text-white">ETIC</span>
          <span className="text-sm font-extrabold uppercase leading-tight">Platform Selection</span>
        </div>
        <p className="mb-2 px-2 text-xs text-slate-400">Menu</p>
        <nav className="space-y-1">
          {NAV[role].map((item) => (
            <NavLink key={item.to} to={item.to} onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-teal-50 text-slate-900' : 'text-slate-400 hover:bg-slate-50'}`}>
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto">
          <p className="mb-2 px-2 text-xs text-slate-400">Extra</p>
          {/* TODO : brancher la déconnexion */}
          <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50">
            <Icon name="logout" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
