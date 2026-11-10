'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { Check, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProduct, getProducts } from "@/lib/products-service";
import { formatCurrency } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchProductData = async () => {
      const p = await getProduct(params.id as string);
      setProduct(p);
      const all = await getProducts();
      setAllProducts(all);
    };

    if (params.id) {
      fetchProductData();
    }
  }, [params.id]);


  if (!product) {
    return <div className="flex h-[60vh] items-center justify-center font-headline italic text-primary/60">LYNN is loading...</div>;
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100))
    : product.price;

  const whatsappMessage = `Hi, I'm interested in this piece: ${product.name} from LYNN Clothing`;
  const whatsappUrl = `https://wa.me/7907963091?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg border border-primary/5">
                  <Image
                    src={img}
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint={`${product.category} product`}
                  />
                   {product.discount && (
                    <Badge className="absolute top-4 right-4 text-[9px] tracking-widest uppercase bg-primary px-3 py-1">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit capitalize text-[9px] tracking-[0.2em] font-medium py-1 px-3">
              {product.category}
            </Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight">{product.name}</h1>
          </div>
          
          <div className="flex items-baseline gap-4">
            <p className="text-3xl font-semibold text-primary">{formatCurrency(discountedPrice)}</p>
             {product.discount && (
                <p className="text-xl font-medium text-muted-foreground line-through opacity-50">
                  {formatCurrency(product.price)}
                </p>
              )}
          </div>
          
          <p className="text-foreground/80 leading-relaxed font-body text-sm md:text-base">{product.description}</p>
          
          <div className="pt-8 border-t border-primary/10">
            <h3 className="font-headline text-lg font-semibold mb-6 italic text-primary">Product Details</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="tracking-wide">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="w-full text-[10px] tracking-[0.3em] uppercase py-8 bg-primary hover:bg-primary/90 rounded-none" asChild>
              <Link href={whatsappUrl} target="_blank">
                <MessageSquare className="mr-2 h-4 w-4" />
                Inquire on WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <ProductRecommendations currentProduct={product} allProducts={allProducts} />
    </div>
  );
}
