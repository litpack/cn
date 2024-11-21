declare global {
    namespace JSX {
      interface IntrinsicElements {
        'cn-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
          variant?: string;
          size?: string;
          label?: string;
        };
      }
    }
  }
  