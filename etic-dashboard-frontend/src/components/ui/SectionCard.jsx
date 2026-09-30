import Icon from './Icon.jsx';

export default function SectionCard({ title, icon, action, children }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <Icon name={icon} />
          </span>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
