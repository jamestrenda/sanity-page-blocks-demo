'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/drawer';
import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

export const MobileNav = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Drawer open={open} onOpenChange={() => setOpen(true)}>
      <DrawerTrigger className="fixed right-4 bottom-4 z-50 rounded-full bg-primary p-4 text-primary-foreground shadow-md">
        <MenuIcon className="size-6" />
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Open navigation menu</DrawerTitle>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="px-4 py-8">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
