import { cn } from '@repo/utils';
import type { ComponentProps, PropsWithChildren } from 'react';

export type Props = ComponentProps<'div'> & PropsWithChildren;

export const Overline = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'pt-overline w-fit rounded-full bg-white px-3 py-1 text-sm font-semibold tracking-wider text-primary uppercase',
        className,
      )}
    >
      {children}
    </div>
  );
};
