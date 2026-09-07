import { Card } from "../ui/Card";

interface ClergyMember {
  name: string;
  role: string;
  photo?: string;
  email?: string;
}

/**
 * ClergyList — displays clergy / staff directory.
 *
 * Shows name, role, and optional photo for each member. All data is fictional
 * per content-policy.md §1.
 */
export function ClergyList({ members }: { members: ClergyMember[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card key={member.name} padding="sm">
          <div className="flex items-center gap-3">
            {member.photo && (
              <img
                src={member.photo}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
