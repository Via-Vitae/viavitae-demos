import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface Product {
  slug: string;
  name: string;
  priceCents: number;
  image?: string;
  inStock: boolean;
}

/**
 * ProductCard — product display with add-to-cart.
 *
 * Used in basilica/shop/ and online-store/ templates.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Card padding="none">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-t-lg object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 space-y-2">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">€{(product.priceCents / 100).toFixed(2)}</p>
          {product.inStock ? (
            <Badge variant="success">In stock</Badge>
          ) : (
            <Badge variant="warning">Out of stock</Badge>
          )}
        </div>
        <Button variant="outline" size="sm" disabled={!product.inStock}>
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
