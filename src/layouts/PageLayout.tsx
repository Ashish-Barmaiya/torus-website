import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  width?: "reading" | "standard" | "wide" | "full";
  className?: string;
  py?: "large" | "medium" | "none";
  align?: "left" | "center";
}

export function PageContainer({
  children,
  width = "standard",
  className = "",
  py = "medium",
  align = "left",
}: PageContainerProps) {
  // Map content widths based on existing design tokens / CSS variables
  const widthClasses = {
    reading: "max-w-content-reading",
    standard: "max-w-content-standard",
    wide: "max-w-content-wide",
    full: "max-w-content-full",
  }[width];

  // Map vertical spacing based on layout system tokens (space-9, space-8)
  const pyClasses = {
    large: "py-space-9",
    medium: "py-space-8",
    none: "",
  }[py];

  // Alignment rules
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left mx-auto";

  return (
    <div
      className={`w-full px-space-4 sm:px-space-5 md:px-space-6 ${widthClasses} ${pyClasses} ${alignClasses} ${className}`}
    >
      {children}
    </div>
  );
}
