import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RentEase India - Smart Rental Management',
  description: 'The complete rental management solution for India. Manage properties, pay rent with UPI, and stay updated.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
