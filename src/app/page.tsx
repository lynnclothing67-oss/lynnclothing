
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
            src="data:image/jpeg;base64,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"
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
