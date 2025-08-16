'use client';

import { useEffect, useState } from 'react';
import { getStyleRecommendations } from '@/ai/flows/style-recommendation-engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/types';

export function ProductRecommendations({ product }: { product: Product }) {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // In a real app, user history and preferences would be dynamic.
        const result = await getStyleRecommendations({
          userHistory: `Viewed ${product.category}: ${product.name}`,
          userPreferences: 'Loves pastel colors, floral patterns, and comfortable fabrics.',
        });
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        setRecommendations('Could not load recommendations at this time.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [product]);

  return (
    <Card className="bg-secondary/30 border-primary/20 mt-4">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-primary" />
            <span>You Might Also Like</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Finding perfect styles for you...</p>
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{recommendations}</p>
        )}
      </CardContent>
    </Card>
  );
}
