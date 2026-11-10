
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { deleteProduct, getProducts } from '@/lib/products-service';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

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
        title: 'Piece Removed',
        description: 'The item has been successfully removed from the catalog.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not remove the item at this time.',
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
            placeholder="Search catalog..." 
            className="pl-9 bg-background focus-visible:ring-primary/20 rounded-none border-primary/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild className="w-full sm:w-auto tracking-[0.2em] uppercase text-[10px] h-12 rounded-none px-8">
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Piece
          </Link>
        </Button>
      </div>

      <Card className="rounded-none border-primary/10 shadow-none">
        <CardHeader className="border-b border-primary/5">
          <CardTitle className="font-headline text-2xl">Collection Overview</CardTitle>
          <CardDescription className="text-[10px] uppercase tracking-widest opacity-60">
            Manage your clothing inventory and digital catalog.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/20">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px] text-[9px] uppercase tracking-[0.2em] font-bold py-6 pl-6">Preview</TableHead>
                <TableHead className="text-[9px] uppercase tracking-[0.2em] font-bold py-6">Name</TableHead>
                <TableHead className="text-[9px] uppercase tracking-[0.2em] font-bold py-6">Category</TableHead>
                <TableHead className="text-[9px] uppercase tracking-[0.2em] font-bold py-6">Price</TableHead>
                <TableHead className="text-right text-[9px] uppercase tracking-[0.2em] font-bold py-6 pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-primary/5 transition-colors border-primary/5">
                    <TableCell className="pl-6">
                      <div className="aspect-[3/4] relative w-12 overflow-hidden border border-primary/10 bg-secondary/10">
                        <Image
                          alt={product.name}
                          src={product.images[0]}
                          fill
                          className="object-cover"
                          data-ai-hint="clothing item"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{product.name}</TableCell>
                    <TableCell className="capitalize text-[10px] tracking-widest opacity-70">{product.category}</TableCell>
                    <TableCell className="font-bold text-primary text-sm">{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none border-primary/10">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}/edit`} className="text-[10px] uppercase tracking-widest py-2 cursor-pointer">Edit Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive text-[10px] uppercase tracking-widest py-2 cursor-pointer"
                            onClick={() => handleDelete(product.id)}
                          >
                            Remove Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground uppercase text-[10px] tracking-[0.3em] opacity-40">
                    No matching pieces found in the collection.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
