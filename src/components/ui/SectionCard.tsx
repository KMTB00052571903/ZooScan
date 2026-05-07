import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export const SectionCard = ({ title, children }: SectionCardProps) => {
  return (
    <div className="section-card">
      <h3 className="section-title">{title}</h3>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};
