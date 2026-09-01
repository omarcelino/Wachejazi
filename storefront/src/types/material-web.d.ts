import type { DetailedHTMLProps, HTMLAttributes } from "react";

type MdElement<Extra extends object = object> = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  "className"
> & { class?: string } & Extra;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "md-filled-button": MdElement<{
        disabled?: boolean;
        "trailing-icon"?: boolean;
        type?: "button" | "submit" | "reset";
        href?: string;
      }>;
      "md-outlined-button": MdElement<{
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
        href?: string;
        "data-selected"?: boolean;
      }>;
      "md-text-button": MdElement<{
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
        href?: string;
      }>;
      "md-icon-button": MdElement<{
        disabled?: boolean;
        "aria-label"?: string;
        href?: string;
      }>;
      "md-icon": MdElement;
      "md-elevated-card": MdElement;
      "md-navigation-bar": MdElement<{
        "active-index"?: number;
        onnavigationbaractivated?: (event: Event) => void;
      }>;
      "md-navigation-tab": MdElement<{
        label?: string;
        active?: boolean;
      }>;
      "md-badge": MdElement<{ value?: string }>;
      "md-radio": MdElement<{
        name?: string;
        value?: string;
        checked?: boolean;
        required?: boolean;
      }>;
      "md-outlined-text-field": MdElement<{
        name?: string;
        label?: string;
        type?: "text" | "tel" | "email";
        required?: boolean;
        placeholder?: string;
        value?: string;
      }>;
    }
  }
}

export {};
