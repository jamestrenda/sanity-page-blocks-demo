import { BlocksType } from '@repo/sanity/types';

import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/toggle-group';
import { cn } from '@repo/utils';
import { ImageIcon, MousePointerClickIcon } from 'lucide-react';
import { useState } from 'react';
import { Actions } from './action';
import { SanityImage } from './image';
import { PortableText } from './portableText';

type HeroBlockProps = BlocksType<'heroBlock'>;

export const Hero = ({ text, image, actions }: HeroBlockProps) => {
  const [showImage, setShowImage] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleChange = (value: string[]) => {
    setShowImage(value.includes('image'));
    setShowActions(value.includes('actions'));
  };

  return (
    <div className="relative isolate grid min-h-[var(--height)] w-full place-items-center overflow-hidden rounded-md bg-zinc-100 p-3 p-8 [--height:600px] lg:aspect-video lg:max-h-[var(--height)] lg:min-h-auto dark:bg-zinc-900">
      <div className="grid gap-6 *:flex *:flex-col *:items-center *:justify-center *:gap-3 *:text-center">
        <PortableText
          value={text}
          className={cn(
            '[&_p]:mx-auto [&_p]:max-w-3xl [&_p]:text-lg',
            showImage ? '*:not-[.pt-overline]:text-background' : '',
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
        {actions && showActions && <Actions actions={actions} />}
      </div>
      <div className="absolute top-4 right-4 z-1">
        <ToggleGroup
          variant="primary"
          type="multiple"
          onValueChange={handleChange}
          size="lg"
        >
          <ToggleGroupItem value="image" aria-label="Toggle background image">
            <ImageIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="actions" aria-label="Toggle call-to-actions">
            <MousePointerClickIcon className="size-4" />
          </ToggleGroupItem>
          {/* <ToggleGroupItem value="text" aria-label="Toggle portable text">
            <TextIcon className="size-4" />
          </ToggleGroupItem> */}
        </ToggleGroup>
      </div>
    </div>
  );
};
