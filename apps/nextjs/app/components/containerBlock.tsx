import { BlocksType } from '@repo/sanity/types';
import { cn } from '@repo/utils';
import { Blocks } from './blocks';
import { Container } from './container';
import { SanityImage } from './image';

type Props = BlocksType<'containerBlock'>;

export const ContainerBlock = ({ content, image }: Props) => {
  return (
    <Container
      className={cn(
        'relative rounded-md bg-zinc-100 px-6',
        'group-has-[.peer.group]:z-10 group-has-[.peer.group]:group-even:bg-primary!',
        'dark:bg-zinc-900 dark:group-has-[.peer.group]:group-even:bg-muted!',
        image
          ? '**:text-background dark:**:text-foreground'
          : 'group-has-[.peer.group]:group-even:**:text-primary-foreground! dark:group-has-[.peer.group]:group-even:**:text-foreground!',
      )}
    >
      {image && (
        <div className="absolute inset-0 -z-1 h-full w-full">
          <SanityImage
            asset={image}
            width={1600}
            height={900}
            priority
            quality={100}
            alt={image.altText}
            className="h-full w-full rounded-md object-cover opacity-50"
          />
        </div>
      )}
      <Blocks blocks={content ?? []} />
    </Container>
  );
};
