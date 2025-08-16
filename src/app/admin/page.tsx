
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, ShoppingBag, Sprout } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { deleteProduct, getProducts, addProduct } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { products as dummyProducts } from '@/lib/products';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      toast({
        title: 'Product Deleted',
        description: 'The product has been successfully deleted.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error deleting the product.',
      });
    }
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      toast({
        title: 'Seeding Database',
        description: 'Please wait while we add the dummy products.',
      });
      let count = 0;
      for (const product of dummyProducts) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...productToAdd } = product; 
        await addProduct(productToAdd);
        count++;
      }
      await fetchProducts(); // Refresh the product list
      toast({
        title: 'Database Seeded',
        description: `${count} products have been successfully added.`,
      });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error Seeding Database',
        description: 'There was an error adding the dummy products.',
      });
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary/50">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold font-headline text-primary">
                PastelCart
              </span>
          </Link>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products and view their sales performance.</CardDescription>
                </div>
                <Button onClick={handleSeedDatabase} disabled={isSeeding || products.length > 0} variant="outline">
                    <Sprout className="mr-2 h-4 w-4" />
                    {isSeeding ? 'Seeding...' : 'Seed Database'}
                </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.images[0]}
                          width="64"
                          data-ai-hint="clothing item"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="capitalize">{product.category}</TableCell>
                      <TableCell>₹{product.price.toFixed(2)}</TableCell>
                      <TableCell>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild><Link href={`/admin/products/${product.id}/edit`}>Edit</Link></DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(product.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className='justify-end'>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
