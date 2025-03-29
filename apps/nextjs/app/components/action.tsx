import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/utils';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import type { ActionProps } from '@repo/sanity/types';

type SanityButtonsProps = {
  actions: ActionProps[] | null;
  className?: string;
  actionClassName?: string;
};

function Action({
  text,
  url,
  newWindow,
  _key,
  _type,
  className,
  ...props
}: ActionProps & ComponentPropsWithoutRef<typeof Button>) {
  if (!url) {
    console.log('Link Broken', { text, url, newWindow });
    return <Button>Link Broken</Button>;
  }

  return (
    <Link
      href={url || '#'}
      target={newWindow ? '_blank' : '_self'}
      aria-label={`Navigate to ${text}`}
      title={`Click to visit ${text}`}
      className="w-full sm:w-fit"
    >
      <Button
        // variant={variant}
        {...props}
        className={cn('w-full', className)}
      >
        {text}
      </Button>
    </Link>
  );
}

export function Actions({
  actions,
  className,
  actionClassName,
}: SanityButtonsProps) {
  if (!actions?.length) return null;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 sm:flex-row',
        className,
      )}
    >
      {actions.map((action) => (
        <Action
          key={`action-${action._key}`}
          {...action}
          className={actionClassName}
        />
      ))}
    </div>
  );
}
