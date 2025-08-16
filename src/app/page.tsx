
'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/products-service";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        const uniqueCategories = [...new Set(fetchedProducts.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative text-center py-20 mb-12 rounded-lg overflow-hidden bg-secondary/50">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Fashion background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="fabric texture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90 tracking-tight">
            Effortless Elegance, Redefined
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Discover curated collections that blend timeless style with modern comfort.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform transform hover:scale-105">
            <Link href="#collections">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section id="collections">
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-transparent p-0 gap-2 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize text-lg py-3 rounded-md border border-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products
                  .filter((p) => p.category === category)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
