
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { deleteProduct, getProducts } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
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
        description: 'The piece has been successfully removed from the collection.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error removing the piece.',
      });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search collection..." 
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild className="w-full sm:w-auto tracking-widest uppercase text-xs">
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Piece
          </Link>
        </Button>
      </div>

      <Card className="rounded-none border-primary/10">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Collection Overview</CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest">
            Manage your boutique inventory and catalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-primary/5">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow>
                  <TableHead className="w-[100px] text-[10px] uppercase tracking-widest">Preview</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest">Name</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest">Category</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest">Price</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <div className="aspect-square relative w-12 h-12 overflow-hidden border border-primary/10">
                          <Image
                            alt={product.name}
                            src={product.images[0]}
                            fill
                            className="object-cover"
                            data-ai-hint={`${product.category} boutique`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="capitalize text-xs">{product.category}</TableCell>
                      <TableCell className="font-semibold text-primary">₹{product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-none">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}/edit`}>Edit Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(product.id)}
                            >
                              Remove Piece
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground uppercase text-[10px] tracking-widest">
                      No matching pieces found in the collection.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
