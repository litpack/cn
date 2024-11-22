declare namespace JSX {
  interface IntrinsicElements {
    "cn-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      variant?: string;
      size?: string;
      label?: string;
      asChild?: boolean;
      children?: JSXElement;
      "aria-label"?: string;
    };
  }
}
