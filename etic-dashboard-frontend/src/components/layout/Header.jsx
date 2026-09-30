import Icon from '../ui/Icon.jsx';
import Avatar from '../ui/Avatar.jsx';

export default function Header({ user, onMenuClick }) {
  return (
    <header className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm sm:gap-4">
      <button type="button" onClick={onMenuClick} aria-label="Ouvrir le menu" className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
        <Icon name="menu" />
      </button>
      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-slate-100 px-4 py-2.5">
        <Icon name="search" className="h-5 w-5 shrink-0 text-slate-500" />
        <input type="search" placeholder="Rechercher" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400" />
      </label>
      <button type="button" aria-label="Notifications" className="rounded-full bg-slate-100 p-3 text-slate-700 hover:bg-slate-200">
        <Icon name="bell" />
      </button>
      <div className="hidden items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 sm:flex">
        <Avatar name={user.name} className="h-9 w-9 bg-teal-500 text-white" />
        <div className="text-xs leading-tight">
          <p className="font-bold">{user.name}</p>
          <p className="text-slate-500">{user.email}</p>
        </div>
      </div>
    </header>
  );
}
