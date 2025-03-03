"use client";

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export const LayoutWrapper = ({ header, footer, children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && header}
      <main>{children}</main>
      {!isAdminRoute && footer}
    </>
  );
};