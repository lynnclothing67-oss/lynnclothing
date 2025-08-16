export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discount?: number;
  images: string[];
  description: string;
  details: string[];
};
