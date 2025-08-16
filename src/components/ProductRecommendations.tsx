
'use client';

import { products } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

export function ProductRecommendations({ currentProduct }: { currentProduct: Product }) {
  const recommendedProducts = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 4); // Show up to 4 recommendations

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-secondary/30 border-primary/20 mt-4">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-primary" />
            <span>Other Products in this Section</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
