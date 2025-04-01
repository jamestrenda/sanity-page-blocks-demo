import { Overline } from '@repo/ui/components/overline';
import {
  PortableText as PortableTextInternal,
  type PortableTextBlock,
  type PortableTextReactComponents,
} from 'next-sanity';
import { CodeBlock } from './code-block';
import { SanityImage } from './image';

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children, value }) => {
      return (
        <h1 className="text-3xl font-bold text-balance text-foreground md:text-5xl">
          {children}
        </h1>
      );
    },
    h2: ({ children, value }) => {
      return <h2 className="text-3xl font-bold text-foreground">{children}</h2>;
    },
    overline: ({ children }) => <Overline>{children}</Overline>,
    //     h2: ({ children, value }) => {
    //       const slug = parseChildrenToSlug(value.children);
    //       return (
    //         <h2
    //           id={slug}
    //           className="scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0"
    //         >
    //           {children}
    //         </h2>
    //       );
    //     },
    //     h3: ({ children, value }) => {
    //       const slug = parseChildrenToSlug(value.children);
    //       return (
    //         <h3 id={slug} className="scroll-m-20 text-2xl font-semibold">
    //           {children}
    //         </h3>
    //       );
    //     },
    //     h4: ({ children, value }) => {
    //       const slug = parseChildrenToSlug(value.children);
    //       return (
    //         <h4 id={slug} className="scroll-m-20 text-xl font-semibold">
    //           {children}
    //         </h4>
    //       );
    //     },
    //     h5: ({ children, value }) => {
    //       const slug = parseChildrenToSlug(value.children);
    //       return (
    //         <h5 id={slug} className="scroll-m-20 text-lg font-semibold">
    //           {children}
    //         </h5>
    //       );
    //     },
    //     h6: ({ children, value }) => {
    //       const slug = parseChildrenToSlug(value.children);
    //       return (
    //         <h6 id={slug} className="scroll-m-20 text-base font-semibold">
    //           {children}
    //         </h6>
    //       );
    //     },
    //     inline: ({ children }) => <span>{children}</span>,
  },
  //   marks: {
  //     code: ({ children }) => (
  //       <code className="rounded-md border-[1px] border-white border-opacity-10  bg-opacity-5 p-1 text-sm  lg:whitespace-nowrap">
  //         {children}
  //       </code>
  //     ),
  //     customLink: ({ children, value }) => {
  //       if (!value.href || value.href === "#") {
  //         console.warn("🚀 link is not set", value);
  //         return (
  //           <span className="underline decoration-dotted underline-offset-2">
  //             Link Broken
  //           </span>
  //         );
  //       }
  //       return (
  //         <Link
  //           className="underline decoration-dotted underline-offset-2"
  //           href={value.href}
  //           prefetch={false}
  //           aria-label={`Link to ${value?.href}`}
  //           target={value.openInNewTab ? "_blank" : "_self"}
  //         >
  //           {children}
  //         </Link>
  //       );
  //     },
  //   },
  //   list: {
  //     bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
  //     number: ({ children }) => <ol className="list-decimal">{children}</ol>,
  //   },
  //   listItem: {
  //     bullet: ({ children }) => <li className="">{children}</li>,
  //     number: ({ children }) => <li className="">{children}</li>,
  //   },
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
  //   hardBreak: () => <br />,
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
    // <div
    //   className={cn(
    //     "prose prose-slate prose-headings:scroll-m-24 prose-headings:font-bold prose-headings:text-opacity-90 prose-p:text-opacity-80 prose-a:underline prose-a:decoration-dotted prose-ol:list-decimal prose-ol:text-opacity-80 prose-ul:list-disc prose-ul:text-opacity-80 prose-h2:border-b prose-h2:pb-2 prose-h2:text-3xl prose-h2:font-semibold prose-h2:prose-h2:first:mt-0 max-w-none",
    //     className,
    //   )}
    // >
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
