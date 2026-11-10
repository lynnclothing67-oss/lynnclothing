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
      <Card className="overflow-hidden h-full group transition-all duration-500 ease-in-out hover:shadow-xl border-transparent bg-transparent rounded-none">
        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden relative bg-secondary/5">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              data-ai-hint={`${product.category} clothing`}
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase py-1 px-3 font-medium">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="py-6 text-center">
            <p className="text-[9px] tracking-[0.4em] text-muted-foreground uppercase mb-3">
              {product.category}
            </p>
            <h3 className="font-headline text-base font-bold truncate mb-3 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-center gap-4">
              <p className="text-primary font-bold text-sm tracking-widest">
                {"\u20B9"}{discountedPrice.toFixed(2)}
              </p>
              {product.discount && (
                <p className="text-muted-foreground line-through text-[10px] opacity-40">
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