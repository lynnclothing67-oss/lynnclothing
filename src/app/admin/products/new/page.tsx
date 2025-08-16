
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState } from 'react';
import { addProduct } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, ImageIcon, ListTree } from 'lucide-react';
import type { Product } from '@/lib/types';

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // State for controlled inputs
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [details, setDetails] = useState<string[]>([]);
  const [currentDetail, setCurrentDetail] = useState('');

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imageUrls.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Image URL Required',
        description: 'Please add at least one image URL.',
      });
      return;
    }

    if (!name || !category || !price) {
        toast({
            variant: 'destructive',
            title: 'Missing Required Fields',
            description: 'Please fill out Product Name, Category, and Price.',
        });
        return;
    }

    setLoading(true);

    try {
      const newProduct: Omit<Product, 'id'> = {
        name,
        category,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : undefined,
        description,
        images: imageUrls,
        details: details,
      };

      addProduct(newProduct).then(() => {
        toast({
          title: 'Product Created',
          description: 'The new product has been successfully added.',
        });
        router.push('/admin');
      }).catch((error) => {
        console.error("Error creating product:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was an error creating the product.',
        });
      }).finally(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error preparing product:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred while preparing the product.',
      });
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
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="e.g. Floral Sundress" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g. dresses" value={category} onChange={e => setCategory(e.target.value)} required />
            </div>
             <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" placeholder="e.g. 5000.00" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input id="discount" type="number" step="0.01" placeholder="e.g. 10" value={discount} onChange={e => setDiscount(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="A light and airy floral sundress..." value={description} onChange={e => setDescription(e.target.value)} />
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
               <div className="space-y-2 mt-2 border rounded-md p-2 min-h-[6rem]">
                  {imageUrls.length === 0 ? (
                    <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        No image URLs added.
                    </div>
                  ) : imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50 text-sm">
                       <p className="flex-1 truncate">{url}</p>
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
               <div className="space-y-2 mt-2 border rounded-md p-2 min-h-[6rem]">
                  {details.length === 0 ? (
                     <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
                        <ListTree className="mr-2 h-4 w-4" />
                        No details added.
                    </div>
                  ) : details.map((detail, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50 text-sm">
                      <p className="flex-1 truncate">{detail}</p>
                      <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveDetail(detail)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
           <Button variant="ghost" asChild>
                <Link href="/admin">Cancel</Link>
           </Button>
          <Button onClick={handleSubmit} disabled={loading} type="button">
            {loading ? <Loader2 className="animate-spin" /> : 'Create Product'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
