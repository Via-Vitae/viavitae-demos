import { DemoBanner } from "@shared/design-system/components/demo";
import { Header } from "@shared/design-system/components/layout";
import { Footer } from "@shared/design-system/components/layout";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/obituary", label: "Obituaries" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <body>
        <DemoBanner />
        <Header navLinks={NAV_LINKS} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
