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
import { PropsWithChildren } from 'react';

export const MobileNav = ({ children }: PropsWithChildren) => {
  return (
    <Drawer>
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
