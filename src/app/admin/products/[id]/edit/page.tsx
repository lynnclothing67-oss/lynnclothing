
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
import { getProduct, updateProduct } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [details, setDetails] = useState<string[]>([]);
  const [currentDetail, setCurrentDetail] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const p = await getProduct(params.id as string);
      setProduct(p);
      if (p) {
        setImageUrls(p.images);
        setDetails(p.details);
      }
    };
    fetchProduct();
  }, [params.id]);
  
  const handleAddImageUrl = () => {
    if (currentImageUrl.trim() && !imageUrls.includes(currentImageUrl.trim())) {
      setImageUrls([...imageUrls, currentImageUrl.trim()]);
      setCurrentImageUrl('');
      toast({
        title: 'Image URL Added',
        description: 'The image URL has been successfully added.',
      });
    } else if (!currentImageUrl.trim()) {
        toast({
            variant: 'destructive',
            title: 'Empty URL',
            description: 'Please enter an image URL.',
        });
    } else {
        toast({
            variant: 'destructive',
            title: 'Duplicate URL',
            description: 'This image URL has already been added.',
        });
    }
  };

  const handleRemoveImageUrl = (urlToRemove: string) => {
    setImageUrls(imageUrls.filter(url => url !== urlToRemove));
  };
  
  const handleAddDetail = () => {
    if (currentDetail.trim() && !details.includes(currentDetail.trim())) {
        setDetails([...details, currentDetail.trim()]);
        setCurrentDetail('');
    }
  };

  const handleRemoveDetail = (detailToRemove: string) => {
    setDetails(details.filter(detail => detail !== detailToRemove));
  };

  if (!product) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (imageUrls.length === 0) {
        toast({
            variant: 'destructive',
            title: 'Image URL Required',
            description: 'Please add at least one image URL.',
        });
        setLoading(false);
        return;
      }

      const discountValue = (document.getElementById('discount') as HTMLInputElement).value;
      const updatedProduct: Partial<Product> = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        category: (document.getElementById('category') as HTMLInputElement).value,
        price: parseFloat((document.getElementById('price') as HTMLInputElement).value),
        discount: discountValue ? parseFloat(discountValue) : undefined,
        description: (document.getElementById('description') as HTMLTextAreaElement).value,
        images: imageUrls,
        details: details,
      };

      await updateProduct(product.id, updatedProduct);
      toast({
        title: 'Product Updated',
        description: 'The product has been successfully updated.',
      });
      router.push('/admin');
    } catch (error) {
       console.error("Error updating product:", error);
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
               <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" defaultValue={product.price} required />
                </div>
                 <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" type="number" step="0.01" defaultValue={product.discount} placeholder="e.g. 10" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={product.description} />
              </div>
               <div className="flex flex-col space-y-1.5">
                 <Label htmlFor="imageUrl">Product Image URLs</Label>
                 <div className="flex items-center gap-2">
                    <Input 
                      id="imageUrl" 
                      type="text" 
                      placeholder="https://example.com/image.png" 
                      value={currentImageUrl}
                      onChange={(e) => setCurrentImageUrl(e.target.value)}
                       onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddImageUrl();
                          }
                        }}
                    />
                    <Button type="button" onClick={handleAddImageUrl}>Add Image</Button>
                </div>
                 <div className="space-y-2 mt-2">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md border bg-muted/50">
                        <span className="text-sm truncate">{url}</span>
                        <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveImageUrl(url)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="details">Product Details</Label>
                 <div className="flex items-center gap-2">
                    <Input 
                      id="details" 
                      type="text" 
                      placeholder="e.g. Pure Cotton" 
                      value={currentDetail}
                      onChange={(e) => setCurrentDetail(e.target.value)}
                       onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddDetail();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddDetail}>Add Detail</Button>
                </div>
                 <div className="space-y-2 mt-2">
                    {details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md border bg-muted/50">
                        <span className="text-sm truncate">{detail}</span>
                        <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveDetail(detail)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
           <Button variant="ghost" asChild>
                <Link href="/admin">Cancel</Link>
           </Button>
          <Button onClick={handleSubmit} disabled={loading} type="button">
            {loading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
