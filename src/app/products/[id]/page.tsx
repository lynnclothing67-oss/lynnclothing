
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { Check, MessageSquare } from "lucide-react";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const whatsappMessage = `Hi, I'm interested in this product: ${product.name}`;
  const whatsappUrl = `https://wa.me/7907963091?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img}
                    alt={`${product.name} - view ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="woman model"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit capitalize">{product.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{product.name}</h1>
          <p className="text-3xl font-semibold text-primary">₹{product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div>
            <h3 className="font-headline text-lg font-semibold mb-2">Details</h3>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full text-lg py-7" asChild>
              <Link href={whatsappUrl} target="_blank">
                <MessageSquare className="mr-2" />
                Buy Now
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
      <ProductRecommendations currentProduct={product} />
    </div>
  );
}
