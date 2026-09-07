interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumbs — navigation breadcrumb trail with structured data.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2" itemProp="itemListElement" itemScope>
            {i > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <a href={crumb.href} itemProp="item" className="hover:text-foreground">
                <span itemProp="name">{crumb.label}</span>
              </a>
            ) : (
              <span itemProp="name" aria-current="page" className="font-medium text-foreground">
                {crumb.label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
