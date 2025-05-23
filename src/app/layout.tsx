'use client';

import "./globals.css";
import { Header } from '../components/header';
import { rubik } from "./fonts";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideHeaderRoutes = ['/login', '/criar-conta'];

  return (
    <html lang="pt-BR">
      <body className={rubik.className}>
        {!hideHeaderRoutes.includes(pathname) && <Header />}
        {children}
      </body>
    </html>
  );
}
