import { customElement } from "solid-element";
import { mergeProps } from "solid-js";
import globalCSS from "../../index.css?inline";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  label?: string;
}

function Button(props: ButtonProps) {
  const mergedProps = mergeProps(
    {
      variant: "default" as VariantProps<typeof buttonVariants>["variant"],
      size: "default" as VariantProps<typeof buttonVariants>["size"],
      disabled: false,
      label: "",
    },
    props
  );

  return (
    <>
      <style>{globalCSS}</style>
      <button
        class={buttonVariants({
          variant: mergedProps.variant,
          size: mergedProps.size,
        })}
        disabled={mergedProps.disabled}
        onClick={mergedProps.onClick}
      >
        {mergedProps.label}
      </button>
    </>
  );
}

customElement(
  "cn-button",
  {
    variant: undefined,
    size: undefined,
    disabled: undefined,
    label: undefined,
    onClick: undefined,
  },
  Button
);
