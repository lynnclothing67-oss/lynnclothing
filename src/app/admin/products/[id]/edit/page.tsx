
'use client';

import { useRouter, useParams } from 'next/navigation';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update the product would go here
    router.push('/admin');
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
                <Input id="images" type="file" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
           <Button variant="ghost" asChild>
                <Link href="/admin">Cancel</Link>
           </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
