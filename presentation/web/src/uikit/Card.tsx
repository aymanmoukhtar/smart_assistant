import {
  CardProps,
  Card as HeroCard,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
  CardHeader as HeroCardHeader,
} from '@heroui/card';
import { HTMLHeroUIProps } from '@heroui/system';
import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { useAppStore } from '../domain/app.store';
import { Divider } from './Divider';

export type ExtraCardProps = {
  children: ReactNode;
  className?: string;
};

const CardHeader = ({
  children,
  className,
  ...rest
}: ExtraCardProps & HTMLHeroUIProps) => {
  return (
    <div className="flex-col items-start justify-center">
      <HeroCardHeader
        {...rest}
        className={clsx(
          'ps-7 pe-7 py-3 min-h-14 flex items-center justify-between',
          className || ''
        )}
      >
        {children}
      </HeroCardHeader>
      <Divider />
    </div>
  );
};

const CardFooter = ({
  children,
  className,
  ...rest
}: ExtraCardProps & HTMLHeroUIProps) => {
  return (
    <div className="flex-col items-start justify-center">
      <Divider />

      <HeroCardFooter
        {...rest}
        className={clsx(
          'ps-7 pe-7 py-3 min-h-14 flex items-center justify-between',
          className || ''
        )}
      >
        {children}
      </HeroCardFooter>
    </div>
  );
};

const CardBody = ({
  children,
  className,
  ...rest
}: ExtraCardProps & HTMLHeroUIProps) => {
  return (
    <HeroCardBody {...rest} className={clsx('ps-7 pe-7 py-5', className || '')}>
      {children}
    </HeroCardBody>
  );
};

const CardTitle = ({ children, className }: ExtraCardProps) => {
  return <h3 className={clsx('font-semibold', className || '')}>{children}</h3>;
};

const Card = forwardRef<HTMLDivElement | null, CardProps & ExtraCardProps>(
  ({ children, className, ...rest }, ref) => {
    const theme = useAppStore((state) => state.theme);
    return (
      <HeroCard
        ref={ref}
        aria-label={rest['aria-label'] || 'aria-label'}
        className={clsx(className || '')}
        style={{
          boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)',
          border: theme === 'light' ? '1px solid #F1F1F4' : '1px solid #1B1C22',
        }}
        {...rest}
      >
        {children}
      </HeroCard>
    );
  }
);

export { Card, CardBody, CardFooter, CardHeader, CardTitle };
