import clsx from 'clsx';
import { forwardRef } from 'react';

export interface IAppIconProps {
  icon: string;
  style?: TAppIconStyle;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export type TAppIconStyle = 'duotone' | 'filled' | 'solid' | 'outline';

// KeenIcon using forwardRef to pass the ref and spread props
const AppIcon = forwardRef<HTMLElement, IAppIconProps>(
  ({ icon, style, size, onClick, className = '', ...props }, ref) => {
    if (!style) {
      style = 'filled';
    }

    // Spread props and apply the ref to the <i> element
    return (
      <i
        onClick={(e) => onClick && onClick(e)}
        ref={ref}
        {...props}
        className={clsx(
          `ki-${style}`,
          `ki-${icon}`,
          className,
          size ? `text-${size}` : ''
        )}
      />
    );
  }
);

export { AppIcon };

