import { sanityFetch } from '@/lib/sanity/live';
import { HEADER_MENU_QUERY } from '@repo/sanity/queries';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

export async function Nav() {
  const { data } = await sanityFetch({
    query: HEADER_MENU_QUERY,
  });
  const { actions } = data ?? {};

  return (
    <nav>
      <ul className="flex flex-col justify-center gap-3 text-center md:flex-row md:flex-wrap">
        <li>
          <Link
            href="/"
            aria-label="Navigate to homepage"
            className="grid place-items-center rounded-md bg-zinc-100 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted md:block dark:bg-zinc-900 dark:text-foreground"
          >
            <HomeIcon className="size-5" />
          </Link>
        </li>
        {actions?.map((item) => (
          <li key={item._key}>
            <Link
              href={item.url || '#'}
              className="block rounded-md bg-zinc-100 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted dark:bg-zinc-900 dark:text-foreground"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function NavSkeleton() {
  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <li key={`nav-item-skeleton-${index.toString()}`}>
            <div className="block h-11 w-20 animate-pulse rounded-md bg-muted px-6 text-sm font-semibold text-foreground dark:bg-zinc-900"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
