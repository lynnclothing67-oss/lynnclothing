
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState } from 'react';
import { addProduct, uploadImage } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { Product } from '@/lib/types';

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({
        variant: 'destructive',
        title: 'Image Required',
        description: 'Please upload a product image.',
      });
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(imageFile);
      const newProduct: Omit<Product, 'id'> = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        category: (document.getElementById('category') as HTMLInputElement).value,
        price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
        description: (document.getElementById('description') as HTMLTextAreaElement).value,
        images: [imageUrl],
        details: [], // Add logic to collect details if needed
      };

      await addProduct(newProduct);
      toast({
        title: 'Product Created',
        description: 'The new product has been successfully added.',
      });
      router.push('/admin');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error creating the product.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill out the details for the new product.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g. Floral Sundress" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g. dresses" required />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="e.g. 5000.00" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="A light and airy floral sundress..." />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Label htmlFor="images">Product Image</Label>
                <Input id="images" type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
           <Button variant="ghost" asChild>
                <Link href="/admin">Cancel</Link>
           </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Create Product'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
