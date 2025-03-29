import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/toggle-group';
import { cn } from '@repo/utils';
import { ImageIcon, MousePointerClickIcon, TextIcon } from 'lucide-react';
import { useState } from 'react';
import { BlocksType } from '../../types';
import { SanityImage } from './image';

type HeroBlockProps = BlocksType<'heroBlock'>;

export const Hero = ({ text, image }: HeroBlockProps) => {
  const [showImage, setShowImage] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleChange = (value: string[]) => {
    setShowImage(value.includes('image'));
    setShowActions(value.includes('actions'));
    setShowText(value.includes('text'));
  };

  return (
    <div className="relative isolate grid h-full min-h-[600px] w-full place-items-center overflow-hidden rounded-md bg-zinc-100 p-3 dark:bg-zinc-900">
      {/* <PortableText value={text} /> */}
      <div>
        <h1
          className={cn(
            'text-5xl font-bold',
            showImage ? 'text-background' : 'text-foreground',
          )}
        >
          {text}
        </h1>
        {image && showImage && (
          <div className="absolute inset-0 -z-1 aspect-video w-full bg-black">
            <SanityImage
              asset={image}
              loading="eager"
              width={1600}
              height={900}
              priority
              quality={80}
              className="h-full w-full rounded-md object-cover opacity-80"
            />
          </div>
        )}
        {/* {actions && showActions && (
          <div>
            <Button>Test</Button>
          </div>
        )} */}
      </div>
      <div className="absolute top-4 right-4 z-1">
        <ToggleGroup
          variant="primary"
          type="multiple"
          onValueChange={handleChange}
        >
          <ToggleGroupItem value="image" aria-label="Toggle background image">
            <ImageIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="actions" aria-label="Toggle call-to-actions">
            <MousePointerClickIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="text" aria-label="Toggle portable text">
            <TextIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};
