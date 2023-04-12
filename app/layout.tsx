import Link from 'next/link';
import './globals.css';

import { Nanum_Gothic } from 'next/font/google';

const gothic = Nanum_Gothic({ weight: '700', subsets: ['latin'] });

export const metadata = {
  title: 'next-blog',
  description: 'made by junsu-Kwon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={gothic.className}>
      <body className="w-11/12 m-auto">
        <header className="flex justify-between items-center pt-2">
          <h1 className="hover:text-gray-400 text-3xl">
            <Link href="/">Junsu&apos;s Blog</Link>
          </h1>
          <nav>
            <Link href="/" className="mr-2 hover:text-gray-400">
              home
            </Link>
            <Link href="/about" className="mr-2 hover:text-gray-400">
              about
            </Link>
            <Link href="/posts" className="mr-2 hover:text-gray-400">
              posts
            </Link>
            <Link href="/contact" className="hover:text-gray-400">
              contact
            </Link>
          </nav>
        </header>
        {children}
        <footer className="text-center mt-10">
          copyright &copy; {new Date().getFullYear()} junsu-Kwon
        </footer>
      </body>
    </html>
  );
}
