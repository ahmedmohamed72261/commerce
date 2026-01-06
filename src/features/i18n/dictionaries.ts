import 'server-only';

export const getDictionary = async (locale: 'en' | 'ar') => {
  if (locale === 'ar') {
    const mod = await import('./ar.json');
    return mod.default;
  }
  const mod = await import('./en.json');
  return mod.default;
};
