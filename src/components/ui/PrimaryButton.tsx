import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const PrimaryButton = ({ children, onClick }: PrimaryButtonProps) => {
  return (
    <button className="primary-button" onClick={onClick}>
      {children}
    </button>
  );
};
