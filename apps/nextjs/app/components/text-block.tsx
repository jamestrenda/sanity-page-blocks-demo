import { BlocksType } from '@repo/sanity/types';

import { Container } from './container';
import { PortableText } from './portableText';

type Props = BlocksType<'textBlock'>;

export const TextBlock = ({ text }: Props) => {
  return (
    <div className="rounded-md bg-zinc-100 px-6 dark:bg-zinc-900">
      <Container>
        <PortableText
          className="prose py-16 prose-zinc lg:py-24 dark:prose-invert prose-a:text-accent prose-a:no-underline prose-a:hover:underline prose-ol:leading-6 prose-ol:marker:text-foreground prose-ul:leading-6 prose-ul:marker:text-foreground"
          value={text}
        />
      </Container>
    </div>
  );
};
