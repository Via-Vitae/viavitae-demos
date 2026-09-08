/**
 * Footer — site footer with legal links and demo attribution.
 */
export function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className="border-t bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} ViaVitae Demo. All entities and data are fictional.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-4">
              <li>
                <a href="/legal" className="text-sm text-muted-foreground hover:text-foreground">
                  Legal
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
