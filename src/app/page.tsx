
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
    
    // If searching, deactivate tab filtering to show all results
    if (lowercasedQuery) {
        setActiveTab('');
    } else if (categories.length > 0) {
        // If search is cleared, reset to the first category
        setActiveTab(categories[0]);
    }

  }, [searchQuery, allProducts, categories]);


  if (loading) {
    return <div>Loading...</div>
  }
  
  const productsToShow = activeTab ? filteredProducts.filter(p => p.category === activeTab) : filteredProducts;

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
        <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="search"
                    placeholder="Search for products..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        
        {searchQuery ? (
           <div className="mt-12">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Search Results for "{searchQuery}"</h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No products found matching your search.</p>
            )}
          </div>
        ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center w-full bg-transparent p-0 gap-2 mb-8 h-auto">
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
