'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/products-service";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import placeholders from "@/app/lib/placeholder-images.json";

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setAllProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        const uniqueCategories = [...new Set(fetchedProducts.map((p) => p.category))];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setActiveTab(uniqueCategories[0]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(results);
    
    if (lowercasedQuery) {
        setActiveTab('');
    } else if (categories.length > 0 && activeTab === '') {
        setActiveTab(categories[0]);
    }

  }, [searchQuery, allProducts, categories, activeTab]);


  if (loading) {
    return <div className="flex h-[60vh] items-center justify-center font-headline italic">LYNN is loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative text-center py-32 mb-16 overflow-hidden bg-secondary/10">
        <div className="absolute inset-0">
          <Image
            src={placeholders.hero.src}
            alt={placeholders.hero.alt}
            fill
            className="opacity-10 object-cover"
            data-ai-hint={placeholders.hero.aiHint}
          />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="font-headline text-6xl md:text-8xl font-bold text-primary tracking-tight leading-tight">
            Curated <br />Sophistication.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80 font-body uppercase tracking-[0.3em]">
            LYNN BOUTIQUE &bull; EST 2024
          </p>
          <Button asChild size="lg" className="mt-12 tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-sm">
            <Link href="#collections">Explore the Collection</Link>
          </Button>
        </div>
      </section>

      <section id="collections" className="scroll-mt-24">
        <div className="mb-16 flex justify-center">
            <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    type="search"
                    placeholder="FIND YOUR STYLE..."
                    className="pl-12 w-full h-14 tracking-widest text-[10px] uppercase border-primary/20 bg-transparent rounded-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        
        {searchQuery ? (
           <div className="mt-12">
            <h2 className="font-headline text-3xl font-bold text-center mb-12 italic">Search Results: "{searchQuery}"</h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground tracking-widest uppercase text-xs">No pieces found matching your criteria.</p>
            )}
          </div>
        ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center w-full bg-transparent p-0 gap-x-10 gap-y-4 mb-16 h-auto">
                {categories.map((category) => (
                <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize text-[10px] tracking-[0.4em] font-medium py-3 bg-transparent border-b border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none transition-all uppercase px-0 shadow-none hover:text-primary/70"
                >
                    {category}
                </TabsTrigger>
                ))}
            </TabsList>

            {categories.map((category) => (
                <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {allProducts
                    .filter((p) => p.category === category)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                </TabsContent>
            ))}
            </Tabs>
        )}
      </section>
    </div>
  );
}