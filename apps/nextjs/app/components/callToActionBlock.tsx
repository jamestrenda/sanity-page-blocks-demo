import { BlocksType } from '@repo/sanity/types';

import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/toggle-group';
import { cn } from '@repo/utils';
import { DotIcon, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { Actions } from './action';
import { SanityImage } from './image';
import { PortableText } from './portableText';

type Props = BlocksType<'callToActionBlock'>;

export const CallToActionBlock = ({
  text,
  image,
  actions,
  showToggles = true,
}: Props & { showToggles?: boolean }) => {
  const [showImage, setShowImage] = useState(!showToggles ? true : false);

  const handleChange = (value: string[]) => {
    setShowImage(value.includes('image'));
  };

  return (
    <div className="relative isolate grid min-h-[var(--height)] w-full place-items-center overflow-hidden rounded-md bg-zinc-100 p-10 [--height:600px] lg:aspect-video lg:max-h-[var(--height)] lg:min-h-auto dark:bg-zinc-900">
      <div
        className={cn(
          'grid gap-8 *:flex *:flex-col *:items-center *:justify-center *:gap-3 *:text-center *:[&_a_button]:bg-background *:[&_a_button]:text-foreground',
          showImage
            ? 'not-dark:*:[&_a_button]:hover:bg-muted dark:*:[&_a_button]:bg-primary dark:*:[&_a_button]:text-primary-foreground dark:*:[&_a_button]:hover:bg-primary/90'
            : '*:[&_a_button]:hover:bg-primary *:[&_a_button]:hover:text-primary-foreground dark:*:[&_a_button]:bg-background',
        )}
      >
        <PortableText
          value={text}
          className={cn(
            'mx-auto max-w-4xl [&_p]:mx-auto [&_p]:max-w-3xl *:[p]:text-base *:[p]:text-balance *:[p]:md:text-lg dark:*:[p]:text-white/50',
            showImage
              ? '*:not-[.pt-overline]:text-background dark:*:not-[.pt-overline]:text-foreground *:[.pt-overline]:bg-background *:[.pt-overline]:text-foreground dark:*:[.pt-overline]:bg-muted dark:*:[p]:text-white/50!'
              : '',
          )}
        />
        {image && showImage && (
          <div className="absolute inset-0 -z-1 h-full w-full bg-black">
            <SanityImage
              asset={image}
              loading="eager"
              width={1600}
              height={900}
              priority
              quality={100}
              alt={image.altText}
              className="h-full w-full rounded-md object-cover opacity-50"
            />
          </div>
        )}
        {actions && <Actions actions={actions} />}
      </div>
      {showToggles && (
        <div className="absolute top-4 right-4 z-1">
          <ToggleGroup
            variant="primary"
            type="multiple"
            onValueChange={handleChange}
            size="lg"
            className={cn(
              '',
              showImage
                ? '[&_button]:bg-background! [&_button]:text-foreground! [&_button]:transition [&_button]:hover:bg-muted!'
                : '',
            )}
          >
            {image && (
              <ToggleGroupItem
                value="image"
                aria-label="Toggle background image"
              >
                <ImageIcon className="size-4" />
                <DotIcon className="absolute -top-[22px] -right-[22px] hidden size-12 text-green-400 group-data-[state=on]/toggle-group-item:flex" />
              </ToggleGroupItem>
            )}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};
