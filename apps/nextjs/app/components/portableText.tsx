import { Overline } from '@repo/ui/components/overline';
import {
  PortableText as PortableTextInternal,
  type PortableTextBlock,
  type PortableTextReactComponents,
} from 'next-sanity';
import { CodeBlock } from './code';
import { SanityImage } from './image';

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => {
      return (
        <h1 className="text-3xl font-bold text-balance text-foreground md:text-5xl">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return <h2 className="text-3xl font-bold text-foreground">{children}</h2>;
    },
    overline: ({ children }) => <Overline>{children}</Overline>,
  },
  types: {
    image: ({ value }) => {
      return (
        <SanityImage
          asset={value}
          className="h-auto w-full rounded-sm object-contain"
          // width={1600}
          // height={900}
          // priority
        />
      );
    },
    code: ({ value }) => {
      return (
        <CodeBlock
          code={value.code}
          language={value.language}
          highlightedLines={value.highlightedLines}
        />
      );
    },
  },
};

export function PortableText<T>({
  value,
  className,
}: {
  value?: T | null;
  className?: string;
}) {
  if (!value) return null;

  return (
    <div className={className}>
      <PortableTextInternal
        value={value as unknown as PortableTextBlock[]}
        components={components}
        onMissingComponent={(_, { nodeType, type }) =>
          console.log('missing component', nodeType, type)
        }
      />
    </div>
  );
}
