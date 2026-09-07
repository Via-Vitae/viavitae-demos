import { DemoBanner } from "@shared/design-system/components/demo";
import { Header } from "@shared/design-system/components/layout";
import { Footer } from "@shared/design-system/components/layout";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/parishes", label: "Parishes" },
  { href: "/mass-schedule", label: "Schedule" },
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
