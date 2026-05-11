declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        ar?: boolean;
        'ar-modes'?: string;
        autoplay?: boolean;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        'ios-src'?: string;
      };
    }
  }
}
