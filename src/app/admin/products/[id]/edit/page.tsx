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
import { Loader2, Trash2, ImageIcon, ListTree, Upload } from 'lucide-react';
import Image from 'next/image';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Component state for controlled inputs
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [details, setDetails] = useState<string[]>([]);
  const [currentDetail, setCurrentDetail] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        const p = await getProduct(params.id as string);
        setProduct(p);
        if (p) {
          setName(p.name);
          setCategory(p.category);
          setPrice(p.price.toString());
          setDiscount(p.discount?.toString() || '');
          setDescription(p.description);
          setImageUrls(p.images);
          setDetails(p.details);
        }
      }
    };
    fetchProduct();
  }, [params.id]);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      setImageUrls(prev => [...prev, ...urls]);
      toast({
        title: `${files.length} image(s) uploaded successfully!`,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
      toast({
        variant: "destructive",
        title: "Image upload failed",
        description: "There was an error uploading your images.",
      });
    } finally {
      setUploading(false);
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
  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (imageUrls.length === 0) {
      toast({
          variant: 'destructive',
          title: 'Image Required',
          description: 'Please upload at least one image.',
      });
      setLoading(false);
      return;
    }

    try {
      const updatedProductData: Partial<Product> = {
        name,
        category,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : undefined,
        description,
        images: imageUrls,
        details: details,
      };

      await updateProduct(product.id, updatedProductData);
      
      toast({
        title: 'Product Updated',
        description: 'The product has been successfully updated.',
      });
      router.push('/admin');

    } catch (error) {
       console.error("Error preparing product update:", error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred while preparing the update.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <Card className="max-w-2xl mx-auto rounded-none border-primary/10">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Edit Piece</CardTitle>
          <CardDescription className="text-[10px] uppercase tracking-widest">Update the details for {product.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold">Product Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="rounded-none border-primary/20" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category" className="text-[10px] uppercase tracking-widest font-bold">Category</Label>
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="rounded-none border-primary/20" />
            </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col space-y-2">
                <Label htmlFor="price" className="text-[10px] uppercase tracking-widest font-bold">Price (Rs.)</Label>
                <Input id="price" type="number" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required className="rounded-none border-primary/20" />
              </div>
               <div className="flex flex-col space-y-2">
                <Label htmlFor="discount" className="text-[10px] uppercase tracking-widest font-bold">Discount (%)</Label>
                <Input id="discount" type="number" step="0.01" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="e.g. 10" className="rounded-none border-primary/20" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description" className="text-[10px] uppercase tracking-widest font-bold">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-none border-primary/20 min-h-[120px]" />
            </div>
             <div className="flex flex-col space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Product Images</Label>
                <div className="p-4 border border-dashed border-primary/20 rounded-none space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                        {imageUrls.map((url, index) => (
                        <div key={index} className="relative group aspect-[3/4] border border-primary/5">
                            <Image src={url} alt={`Product image ${index + 1}`} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Button type="button" size="icon" variant="destructive" className="h-8 w-8 rounded-none" onClick={() => handleRemoveImageUrl(url)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>
                        ))}
                    </div>

                    {uploading ? (
                      <div className="flex flex-col items-center justify-center p-8 bg-secondary/10">
                        <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Uploading...</span>
                      </div>
                    ) : (
                      <Label htmlFor="image-upload" className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/10 rounded-none cursor-pointer hover:bg-secondary/20 transition-colors">
                        <Upload className="h-6 w-6 mb-2 text-primary/60" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Add Images</span>
                        <Input id="image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
                      </Label>
                    )}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="details" className="text-[10px] uppercase tracking-widest font-bold">Product Details</Label>
               <div className="flex items-center gap-2">
                  <Input 
                    id="details" 
                    type="text" 
                    placeholder="e.g. Pure Cotton" 
                    value={currentDetail}
                    onChange={(e) => setCurrentDetail(e.target.value)}
                    className="rounded-none border-primary/20"
                     onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDetail();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" className="rounded-none uppercase text-[10px] tracking-widest h-10 px-6" onClick={handleAddDetail}>Add</Button>
              </div>
               <div className="space-y-2 mt-4 border border-primary/5 p-3 min-h-[100px] bg-secondary/5">
                   {details.length === 0 ? (
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center justify-center h-full opacity-40">
                      <ListTree className="mr-2 h-4 w-4" />
                      No specifications added.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                        {details.map((detail, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-1.5 border border-primary/10 bg-background text-[10px] uppercase tracking-widest">
                                {detail}
                                <button type="button" onClick={() => handleRemoveDetail(detail)} className="text-destructive hover:text-destructive/70">
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-primary/5 pt-6 mt-6">
           <Button variant="ghost" asChild className="rounded-none uppercase text-[10px] tracking-widest">
                <Link href="/admin">Cancel</Link>
           </Button>
          <Button onClick={handleSubmit} disabled={loading || uploading} type="button" className="rounded-none uppercase text-[10px] tracking-[0.2em] h-12 px-10">
            {loading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
