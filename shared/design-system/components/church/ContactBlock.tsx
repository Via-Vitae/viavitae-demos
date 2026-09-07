import { Card } from "../ui/Card";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

/**
 * ContactBlock — contact information with optional map embed.
 *
 * All contact data is fictional per content-policy.md §1.
 */
export function ContactBlock({ contact }: { contact: ContactInfo }) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">Contact</h2>
      <address className="space-y-2 not-italic">
        <p>{contact.address}</p>
        <p>
          <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
            {contact.phone}
          </a>
        </p>
        <p>
          <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
            {contact.email}
          </a>
        </p>
      </address>
    </Card>
  );
}
