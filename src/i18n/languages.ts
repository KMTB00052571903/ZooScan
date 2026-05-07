export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English',    flag: '🇺🇸' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
];
