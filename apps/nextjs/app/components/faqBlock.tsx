import { BlocksType } from '@repo/sanity/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';
import { cn } from '@repo/utils';
import { Container } from './container';
import { PortableText } from './portableText';

type Props = BlocksType<'faqBlock'>;

export const FaqBlock = ({ header, faqs }: Props) => {
  return (
    Array.isArray(faqs) &&
    faqs.length > 0 && (
      <>
        <div className="rounded-md bg-zinc-100 px-6 py-8 md:py-16 lg:py-24 dark:bg-zinc-900">
          <Container className="mt-10">
            {header.text && (
              <div className="*:flex *:flex-col *:gap-3">
                <PortableText
                  value={header.text}
                  className={cn(
                    'max-w-4xl [&_p]:max-w-3xl *:[p]:text-base *:[p]:text-balance *:[p]:md:text-lg dark:*:[p]:text-white/50',
                    '',
                  )}
                />
              </div>
            )}
            <Accordion
              type="multiple"
              orientation="horizontal"
              className="mt-10"
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq._id} value={faq._id}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </div>
        <div className="py-8 md:py-16 lg:py-24">
          <Container className="mt-10">
            {header.text && (
              <div className="*:flex *:flex-col *:gap-3">
                <PortableText
                  value={header.text}
                  className={cn(
                    'max-w-4xl [&_.pt-overline]:dark:bg-muted! [&_p]:max-w-3xl *:[p]:text-base *:[p]:text-balance *:[p]:md:text-lg dark:*:[p]:text-white/50',
                    '',
                  )}
                />
              </div>
            )}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="space-y-3 rounded-md bg-zinc-100 px-6 py-8 dark:bg-zinc-900"
                >
                  <h3 className="text-left text-lg font-bold">
                    {faq.question}
                  </h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </>
    )
  );
};
