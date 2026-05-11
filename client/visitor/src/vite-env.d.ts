/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
// Explicit ambient declaration so noUncheckedSideEffectImports never fires on CSS/assets
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
