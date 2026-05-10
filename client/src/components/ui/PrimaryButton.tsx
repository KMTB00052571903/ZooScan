import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const PrimaryButton = ({ children, onClick, disabled }: PrimaryButtonProps) => {
  return (
    <button className="primary-button" onClick={onClick} disabled={disabled} style={{ opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
};
