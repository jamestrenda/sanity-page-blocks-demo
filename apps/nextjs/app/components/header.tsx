import { Suspense } from 'react';
import { MobileNav } from './mobileNav';
import { Nav, NavSkeleton } from './nav';

export const Header = () => {
  return (
    <header className="flex items-center justify-center md:py-8">
      <div className="hidden md:block">
        <Suspense fallback={<NavSkeleton />}>
          <Nav />
        </Suspense>
      </div>
      <div className="md:hidden">
        <MobileNav>
          <Nav />
        </MobileNav>
      </div>
    </header>
  );
};
