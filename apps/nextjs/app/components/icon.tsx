import { cn } from '@repo/utils';
import type { ComponentProps } from 'react';
import { memo } from 'react';

interface IconProps extends Omit<ComponentProps<'span'>, 'src'> {
  icon?:
    | {
        svg?: string | null;
        name?: string | null;
      }
    | string
    | null;
  alt?: string; // Add alt text prop for accessibility
}

export const Icon = memo(function SanityIconUnmemorized({
  icon,
  className,
  alt: altText = 'sanity-icon',
  ...props
}: IconProps) {
  const alt = typeof icon === 'object' && icon?.name ? icon?.name : altText;
  const svg = typeof icon === 'object' ? icon?.svg : icon;

  if (!svg) {
    return null;
  }

  return (
    <span
      {...props}
      className={cn(
        'flex items-center justify-center [&_svg]:size-5!',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
      role="img"
      aria-label={alt}
      title={alt}
    />
  );
});
