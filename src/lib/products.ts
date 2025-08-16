
import type { Product } from "./types";

// This file is now a fallback or for seeding, and is no longer the primary data source.
export const products: Product[] = [
  {
    id: "1",
    name: "Floral Sundress",
    category: "dresses",
    price: 75.0,
    images: [
      "https://placehold.co/600x800.png",
      "https://placehold.co/600x800.png",
      "https://placehold.co/600x800.png",
    ],
    description:
      "A light and airy floral sundress, perfect for warm summer days. Made from 100% cotton, it features a flattering A-line silhouette and adjustable spaghetti straps.",
    details: ["100% Cotton", "A-line silhouette", "Adjustable straps", "Machine washable"],
  },
  {
    id: "2",
    name: "Classic Linen Shirt",
    category: "tops",
    price: 55.0,
    images: [
      "https://placehold.co/600x800.png",
      "https://placehold.co/600x800.png",
    ],
    description:
      "A timeless wardrobe staple, this classic linen shirt offers both comfort and style. It's breathable, versatile, and can be dressed up or down for any occasion.",
    details: ["100% Linen", "Button-front closure", "Relaxed fit", "Sustainably sourced"],
  },
  {
    id: "3",
    name: "High-Waisted Jeans",
    category: "bottoms",
    price: 90.0,
    images: [
      "https://placehold.co/600x800.png",
      "https://placehold.co/600x800.png",
    ],
    description:
      "Flatter your figure with these high-waisted skinny jeans. Crafted from a stretchy denim blend, they provide a comfortable fit that moves with you.",
    details: ["Cotton/Spandex Blend", "High-rise waist", "Five-pocket styling", "Slim fit"],
  },
  {
    id: "4",
    name: "Cashmere Sweater",
    category: "tops",
    price: 150.0,
    images: [
      "https://placehold.co/600x800.png",
      "https://placehold.co/600x800.png",
    ],
    description:
      "Indulge in the luxurious softness of our pure cashmere sweater. Featuring a classic crew neck and ribbed trim, it's an elegant addition to your cold-weather wardrobe.",
    details: ["100% Cashmere", "Crew neckline", "Ribbed cuffs and hem", "Dry clean only"],
  },
  {
    id: "5",
    name: "Pleated Midi Skirt",
    category: "bottoms",
    price: 80.0,
    images: [
        "https://placehold.co/600x800.png",
        "https://placehold.co/600x800.png"
    ],
    description: "An elegant pleated midi skirt that flows with every step. The elastic waistband ensures a comfortable fit, while the delicate pleats add a touch of sophistication.",
    details: ["Polyester blend", "Elastic waistband", "Midi length", "Fully lined"]
  },
  {
    id: "6",
    name: "Bohemian Maxi Dress",
    category: "dresses",
    price: 120.0,
    images: [
        "https://placehold.co/600x800.png",
        "https://placehold.co/600x800.png"
    ],
    description: "Embrace your inner free spirit with this stunning bohemian maxi dress. It features intricate embroidery, a flowing silhouette, and a tassel tie neckline.",
    details: ["Viscose fabric", "V-neck with tassel tie", "Long bell sleeves", "Ankle length"]
  },
  {
    id: "7",
    name: "Silk Camisole",
    category: "tops",
    price: 65.0,
    images: [
        "https://placehold.co/600x800.png",
        "https://placehold.co/600x800.png"
    ],
    description: "A versatile silk camisole that can be layered or worn on its own. The delicate lace trim adds a feminine touch.",
    details: ["100% Mulberry Silk", "V-neck with lace trim", "Adjustable spaghetti straps", "Hand wash recommended"]
  },
  {
    id: "8",
    name: "Tailored Trousers",
    category: "bottoms",
    price: 95.0,
    images: [
        "https://placehold.co/600x800.png",
        "https://placehold.co/600x800.png"
    ],
    description: "Look sharp and sophisticated in these tailored trousers. The straight-leg cut and pressed creases create a polished and professional look.",
    details: ["Polyester/Rayon blend", "Zip fly with hook closure", "Side pockets", "Straight-leg fit"]
  },
  {
    id: "9",
    name: "Girl's Twirl Dress",
    category: "girls",
    price: 45.0,
    images: [
        "https://placehold.co/600x800.png"
    ],
    description: "A playful and comfortable dress perfect for any little girl. Made from soft cotton with a full skirt for maximum twirl.",
    details: ["100% Cotton", "Round neck", "Short sleeves", "Machine washable"]
  },
  {
    id: "10",
    name: "Girl's Graphic Tee",
    category: "girls",
    price: 25.0,
    images: [
        "https://placehold.co/600x800.png"
    ],
    description: "A fun graphic t-shirt with a cute unicorn print. Made from soft, breathable cotton.",
    details: ["100% Cotton", "Crew neck", "Unicorn graphic", "Machine washable"]
  },
  {
    id: "11",
    name: "Girl's Denim Skirt",
    category: "girls",
    price: 35.0,
    images: [
        "https://placehold.co/600x800.png"
    ],
    description: "A classic denim skirt with an adjustable waistband for a perfect fit. Features front and back pockets.",
    details: ["Cotton/Elastane blend", "Adjustable waistband", "Five-pocket styling", "Button and zip closure"]
  }
];
