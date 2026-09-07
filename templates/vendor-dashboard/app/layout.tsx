import { DemoBanner } from "@shared/design-system/components/demo";
import { Header } from "@shared/design-system/components/layout";
import { Footer } from "@shared/design-system/components/layout";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/payouts", label: "Payouts" },
  { href: "/analytics", label: "Analytics" },
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
