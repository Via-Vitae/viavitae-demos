import { DemoBanner } from "@shared/design-system/components/demo";
import { Header } from "@shared/design-system/components/layout";
import { Footer } from "@shared/design-system/components/layout";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/mass-schedule", label: "Mass Schedule" },
  { href: "/sacraments", label: "Sacraments" },
  { href: "/gallery", label: "Gallery" },
  { href: "/shop", label: "Shop" },
  { href: "/news", label: "News" },
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
