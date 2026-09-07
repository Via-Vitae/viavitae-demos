"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavLink {
  href: string;
  label: string;
}

/**
 * Header — site header with navigation and language switcher.
 *
 * Includes the DemoBanner above (injected by layout.tsx).
 */
export function Header({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-bold">
          ViaVitae Demo
        </a>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
