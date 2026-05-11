/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
// Explicit ambient declaration so noUncheckedSideEffectImports never fires on CSS/assets
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

// model-viewer web component type declarations
interface ModelViewerHTMLAttributes {
  src?: string;
  alt?: string;
  ar?: string;
  'ar-modes'?: string;
  'camera-controls'?: string;
  autoplay?: string;
  'shadow-intensity'?: string;
  'environment-image'?: string;
  'ios-src'?: string;
  style?: string;
  class?: string;
  id?: string;
  children?: never;
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerHTMLAttributes;
    }
  }
}
