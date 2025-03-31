import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="container mx-auto lg:max-w-7xl">{children}</div>;
};
