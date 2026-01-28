import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  const baseStyles = "border rounded-lg backdrop-blur-sm transition-colors";
  const interactiveStyles = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      style={{
        borderColor: 'var(--border-green)',
        backgroundColor: 'var(--card-bg)',
      }}
      onMouseEnter={onClick ? (e) => {
        e.currentTarget.style.borderColor = 'var(--primary-green)';
      } : undefined}
      onMouseLeave={onClick ? (e) => {
        e.currentTarget.style.borderColor = 'var(--border-green)';
      } : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
