"use client";

import NotistackProvider from "@/components/atom/error-handler/notistack";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <NotistackProvider>{children}</NotistackProvider>;
};
export default Layout;
