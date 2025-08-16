
'use client';

import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getProduct, updateProduct, uploadImage } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const p = await getProduct(params.id as string);
      setProduct(p);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = product.images[0];
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const updatedProduct: Partial<Product> = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        category: (document.getElementById('category') as HTMLInputElement).value,
        price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
        description: (document.getElementById('description') as HTMLTextAreaElement).value,
        images: [imageUrl],
        details: product.details, // Assuming details are not editable in this form
      };

      await updateProduct(product.id, updatedProduct);
      toast({
        title: 'Product Updated',
        description: 'The product has been successfully updated.',
      });
      router.push('/admin');
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error updating the product.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>Update the details for {product.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" defaultValue={product.name} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Input id="category" defaultValue={product.category} required />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" defaultValue={product.price} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={product.description} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Label htmlFor="images">Product Image</Label>
                <Input id="images" type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
           <Button variant="ghost" asChild>
                <Link href="/admin">Cancel</Link>
           </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
