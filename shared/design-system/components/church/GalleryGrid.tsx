import { Card } from "../ui/Card";

interface GalleryImage {
  src: string;
  altLt: string;
  altEn: string;
  altRu: string;
  licence: string;
}

/**
 * GalleryGrid — image gallery with lightbox support.
 *
 * All images must have trilingual alt-text and a valid licence entry in
 * `shared/seed/media-manifest.json` (content-policy.md §3).
 */
export function GalleryGrid({
  images,
  locale,
}: {
  images: GalleryImage[];
  locale: "lt" | "en" | "ru";
}) {
  const altKey = { lt: "altLt", en: "altEn", ru: "altRu" } as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img) => (
        <Card key={img.src} padding="none">
          <img
            src={img.src}
            alt={img[altKey[locale]]}
            className="aspect-[4/3] w-full rounded-t-lg object-cover"
            loading="lazy"
          />
          <div className="p-3">
            <p className="text-xs text-muted-foreground">Licence: {img.licence}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
