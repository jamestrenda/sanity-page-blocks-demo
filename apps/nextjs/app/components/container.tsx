import { cn } from '@repo/utils';
import { PropsWithChildren } from 'react';

export const Container = ({
  children,
  className,
}: PropsWithChildren & {
  className?: string;
}) => {
  return (
    <div className={cn('container mx-auto lg:max-w-7xl', className)}>
      {children}
    </div>
  );
};
