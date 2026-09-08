"use client";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

/**
 * CartTeaser — mini cart indicator in the header.
 *
 * Shows item count and total. Clicking opens the cart sidebar.
 */
export function CartTeaser({ itemCount, totalCents }: { itemCount: number; totalCents: number }) {
  return (
    <Button variant="ghost" size="sm" className="relative">
      <span aria-label={`${itemCount} items in cart`}>🛒 {itemCount}</span>
      {itemCount > 0 && (
        <Badge variant="default" className="absolute -right-1 -top-1 h-5 w-5 p-0 text-[10px]">
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
