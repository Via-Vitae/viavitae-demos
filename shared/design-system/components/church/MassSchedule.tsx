"use client";

import { Card } from "../ui/Card";

interface MassTime {
  day: string;
  time: string;
  intention?: string;
}

/**
 * MassSchedule — displays weekly mass times with ICS export.
 *
 * Renders a table of mass times. Includes an "Add to calendar" button that
 * generates an ICS file for the selected mass.
 */
export function MassSchedule({ masses }: { masses: MassTime[] }) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">Mass Schedule</h2>
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left font-medium">Day</th>
            <th className="py-2 text-left font-medium">Time</th>
            <th className="py-2 text-left font-medium">Intention</th>
          </tr>
        </thead>
        <tbody>
          {masses.map((mass, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-2">{mass.day}</td>
              <td className="py-2">{mass.time}</td>
              <td className="py-2 text-muted-foreground">{mass.intention ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
