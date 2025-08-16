
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products-service';

export function ProductRecommendations({ currentProduct }: { currentProduct: Product }) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const allProducts = await getProducts();
      const recommendations = allProducts.filter(
        (p) => p.category === currentProduct.category && p.id !== currentProduct.id
      ).slice(0, 4);
      setRecommendedProducts(recommendations);
    };

    fetchRecommendations();
  }, [currentProduct]);


  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-center mb-8">
        <Sparkles className="h-6 w-6 text-primary mr-3" />
        <h2 className="font-headline text-3xl font-bold text-center">Other Products in this Section</h2>
         <Sparkles className="h-6 w-6 text-primary ml-3" />
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  );
}
