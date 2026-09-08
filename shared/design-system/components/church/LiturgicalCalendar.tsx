"use client";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface CalendarEvent {
  date: string;
  name: string;
  liturgicalColor: string;
  type: "solemnity" | "feast" | "memorial" | "weekday";
}

/**
 * LiturgicalCalendar — displays feast days and liturgical colours.
 *
 * Colour badges use the standard liturgical colour palette:
 * green (Ordinary Time), white (Christmas/Easter), red (Martyrs/Pentecost),
 * purple (Lent/Advent), rose (Gaudete/Laetare).
 */
export function LiturgicalCalendar({ events }: { events: CalendarEvent[] }) {
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    white: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
    rose: "bg-pink-100 text-pink-800",
  };

  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">Liturgical Calendar</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.date}
            className="flex items-center justify-between border-b py-2 last:border-0"
          >
            <div>
              <span className="text-sm text-muted-foreground">{event.date}</span>
              <span className="ml-3 font-medium">{event.name}</span>
            </div>
            <Badge className={colorMap[event.liturgicalColor] ?? ""}>{event.liturgicalColor}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
