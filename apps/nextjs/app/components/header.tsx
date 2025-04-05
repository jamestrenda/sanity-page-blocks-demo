import { Suspense } from 'react';
import { MobileNav } from './mobileNav';
import { Nav, NavSkeleton } from './nav';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center bg-background md:py-8">
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
