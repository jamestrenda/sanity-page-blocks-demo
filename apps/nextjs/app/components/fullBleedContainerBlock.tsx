import { BlocksType } from '@repo/sanity/types';
import { cn } from '@repo/utils';
import { Blocks } from './blocks';
import { Container } from './container';
import { SanityImage } from './image';

type Props = BlocksType<'containerBlock'>;

export const FullBleedContainerBlock = ({ content, image }: Props) => {
  return (
    <Container
      className={cn(
        'relative -mx-4 grid w-[calc(100%+var(--spacing-8))] max-w-none! place-items-center px-6 py-8',
        'group-has-[.peer.group]:z-10 group-has-[.peer.group]:group-even:bg-primary! dark:bg-zinc-900',
        'md:-mx-8 lg:min-h-screen **:lg:text-2xl! md:lg:w-[calc(100%+var(--spacing-8))]',
        image
          ? '**:text-background dark:**:text-foreground'
          : 'group-has-[.peer.group]:group-even:**:text-primary-foreground!',
      )}
    >
      {image && (
        <div className="absolute inset-0 -z-1 h-full w-full bg-black">
          <SanityImage
            asset={image}
            width={1600}
            height={900}
            priority
            quality={100}
            alt={image.altText}
            className="h-full w-full object-cover opacity-50"
          />
        </div>
      )}
      <Blocks blocks={content ?? []} />
    </Container>
  );
};
