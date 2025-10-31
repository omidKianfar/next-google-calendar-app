import { AppProps, NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

declare global {
  type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
