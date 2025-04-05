import '@repo/ui/styles.css';

import { cn } from '@repo/utils';
import { VisualEditing } from 'next-sanity';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Geist, Geist_Mono } from 'next/font/google';
import { draftMode } from 'next/headers';
import { preconnect, prefetchDNS } from 'react-dom';
import { SanityLive } from '../lib/sanity/live';
import { Header } from './components/header';
import { PreviewBar } from './components/preview-bar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect('https://cdn.sanity.io');
  prefetchDNS('https://cdn.sanity.io');

  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
        )}
      >
        <div className="flex min-h-dvh flex-col font-[family-name:var(--font-geist-sans)]">
          <Header />
          <main className="flex w-full grow flex-col gap-8 p-4 md:p-8">
            {(await draftMode()).isEnabled ? (
              <>
                {children}
                <VisualEditing
                  refresh={async (payload) => {
                    'use server';
                    if (payload.source === 'manual') {
                      revalidatePath('/', 'layout');
                      return;
                    }
                    const id = payload?.document?._id?.startsWith('drafts.')
                      ? payload?.document?._id.slice(7)
                      : payload?.document?._id;
                    const slug = payload?.document?.slug?.current;
                    const type = payload?.document?._type;
                    for (const tag of [slug, id, type]) {
                      if (tag) revalidateTag(tag);
                    }
                  }}
                />
                <PreviewBar />
              </>
            ) : (
              children
            )}
          </main>
        </div>
        <SanityLive />
      </body>
    </html>
  );
}
