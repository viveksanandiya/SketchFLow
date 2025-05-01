"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outline";
  className?: string;
  size: "lg" | "sm";
  children?: ReactNode;
  onClick?: () => void;
}

export const Button = ({ size, className, variant, children, onClick }: ButtonProps) => {
  return (
    <button
      className={`
        ${className} 
        ${variant === "primary" ? "primary" : "outlined"} 
        ${size === "lg" ? "px-4 py-2": "px-2 py-1"}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
