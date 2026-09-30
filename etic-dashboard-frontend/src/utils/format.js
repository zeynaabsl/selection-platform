export const percent = (done, total) => (total > 0 ? Math.round((done / total) * 100) : 0);

export const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
