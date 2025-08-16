
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100))
    : product.price;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden h-full group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 border-transparent hover:border-primary/20 bg-transparent">
        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="woman clothing"
            />
          </div>
          <div className="p-4 bg-background">
            <h3 className="font-headline text-lg font-semibold truncate">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-primary font-medium">
                ₹{discountedPrice.toFixed(2)}
              </p>
              {product.discount && (
                <p className="text-muted-foreground line-through text-sm">
                  ₹{product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
