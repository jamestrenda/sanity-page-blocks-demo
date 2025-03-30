import { Suspense } from 'react';
import { Nav, NavSkeleton } from './nav';

export const Header = () => {
  return (
    <header className="flex items-center justify-center py-8">
      <Suspense fallback={<NavSkeleton />}>
        <Nav />
      </Suspense>
    </header>
  );
};
