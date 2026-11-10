'use client';

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
      <Card className="overflow-hidden h-full group transition-all duration-500 ease-in-out hover:shadow-2xl border-transparent bg-transparent rounded-none">
        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              data-ai-hint={`${product.category} clothing`}
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase py-1 px-2 font-bold shadow-lg">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="p-6 bg-background/50 backdrop-blur-sm border-t border-primary/5 text-center">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
              {product.category}
            </p>
            <h3 className="font-headline text-lg font-bold truncate mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-center gap-3">
              <p className="text-primary font-bold">
                {"\u20B9"}{discountedPrice.toFixed(2)}
              </p>
              {product.discount && (
                <p className="text-muted-foreground line-through text-xs opacity-60">
                  {"\u20B9"}{product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
