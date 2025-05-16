import "./globals.css";
import { Header } from '../components/header'
import { rubik } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={rubik.className}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
