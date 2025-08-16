
import type { Product } from "./types";

// This file is now a fallback or for seeding, and is no longer the primary data source.
export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Pink Salwar Suit",
    category: "salwar readymade",
    price: 3499,
    discount: 15,
    images: [
      "https://i.pinimg.com/564x/e7/05/9a/e7059a48b8e898f623992b154784262b.jpg",
      "https://i.pinimg.com/564x/a5/97/a5/a597a55250937a0160b731e87a28424a.jpg",
    ],
    description: "A beautiful ready-to-wear Salwar suit in a lovely pink shade, perfect for festive occasions. The fine cotton fabric ensures comfort all day long.",
    details: ["Pure Cotton", "Embroidered Neckline", "Comes with matching Dupatta", "Comfort Fit"],
  },
  {
    id: "2",
    name: "Royal Blue Party Gown",
    category: "party wear 3 piece",
    price: 5999,
    images: [
      "https://i.pinimg.com/564x/6c/5c/4b/6c5c4b57223b53f7c9e0a8ca184d08a2.jpg",
    ],
    description: "A stunning 3-piece party wear gown in royal blue with intricate sequin work. Make a statement at any event.",
    details: ["Georgette Fabric", "Sequin Embellishments", "Includes Gown, Pants, and Dupatta", "Floor Length"],
  },
  {
    id: "3",
    name: "Casual Striped Top",
    category: "tops",
    price: 899,
    discount: 10,
    images: [
      "https://i.pinimg.com/564x/9f/63/a3/9f63a35f5c351f153a71b4e057e0b299.jpg",
    ],
    description: "A comfortable and stylish striped top for everyday wear. Pairs perfectly with jeans or skirts.",
    details: ["Cotton Blend", "Round Neck", "Half Sleeves", "Regular Fit"],
  },
  {
    id: "4",
    name: "Chic Western Dress",
    category: "western wear",
    price: 2499,
    images: [
      "https://i.pinimg.com/564x/b8/18/d8/b818d8e58f0e52729a43a3d5377f7632.jpg",
      "https://i.pinimg.com/564x/d1/15/8d/d1158d60144d277a94a40f898a39d899.jpg",
    ],
    description: "A modern and chic A-line western dress, perfect for a day out or a casual evening.",
    details: ["Crepe Fabric", "A-Line Cut", "Knee-Length", "Concealed Zipper"],
  },
  {
    id: "5",
    name: "Classic Blue Jeans",
    category: "jeans",
    price: 1999,
    images: [
        "https://i.pinimg.com/564x/9a/9a/0f/9a9a0f0e0f0e0f0e0f0e0f0e0f0e0f0e.jpg",
        "https://i.pinimg.com/564x/f3/f1/a0/f3f1a04386a4f89551c6e18b87123348.jpg"
    ],
    description: "A pair of classic and comfortable slim-fit blue jeans for a versatile look that never goes out of style.",
    details: ["Denim", "Slim Fit", "5-Pocket Design", "Mid-Rise"]
  },
  {
    id: "6",
    name: "Stylish Denim Skirt",
    category: "denim skirt",
    price: 1499,
    discount: 20,
    images: [
        "https://i.pinimg.com/564x/a2/5b/e4/a25be4722a45a3f124c6e9496677e434.jpg"
    ],
    description: "A trendy button-front denim skirt that pairs well with any top, from casual tees to elegant blouses.",
    details: ["Stretchable Denim", "Button-front", "Mini Length", "High Waist"]
  },
  {
    id: "7",
    name: "Unstitched Silk Salwar Material",
    category: "salwar material",
    price: 2999,
    images: [
        "https://i.pinimg.com/564x/3b/68/73/3b687353f4841961e685f0c727092895.jpg"
    ],
    description: "High-quality unstitched silk salwar material in vibrant colors to create your own unique, custom-tailored design.",
    details: ["Pure Silk", "Includes Top, Bottom, and Dupatta fabric", "Vibrant Colors", "Soft Texture"]
  },
  {
    id: "8",
    name: "Printed Cotton Running Material",
    category: "running materials",
    price: 399,
    images: [
        "https://i.pinimg.com/564x/1e/8a/1c/1e8a1c3f9a7a9c8d5b1f9b3f3e1a0b16.jpg"
    ],
    description: "Versatile printed cotton fabric, sold by the meter. Ideal for creating custom dresses, kurtis, blouses, and more.",
    details: ["100% Cotton", "44-inch width", "Sold per meter", "Breathable Fabric"]
  },
  {
    id: "9",
    name: "Bandhani Print Dupatta",
    category: "duppattas",
    price: 799,
    images: [
        "https://i.pinimg.com/564x/78/3c/6f/783c6f8f10820f4c6328a47814f3b142.jpg"
    ],
    description: "A beautiful Bandhani print art silk dupatta to accessorize your ethnic outfits and add a pop of color.",
    details: ["Art Silk", "Traditional Tie-Dye Print", "Tasseled Edges", "Lightweight"]
  },
  {
    id: "10",
    name: "Green Georgette Salwar",
    category: "salwar readymade",
    price: 3299,
    discount: 5,
    images: [
        "https://i.pinimg.com/564x/c7/2b/56/c72b568393529d48682a837b98d1a1b1.jpg"
    ],
    description: "An elegant readymade salwar suit in a beautiful shade of green georgette, fully lined for comfort.",
    details: ["Georgette", "Lined", "Full Sleeves", "Comes with matching Churidar"]
  },
   {
    id: "11",
    name: "Black Ruffle Top",
    category: "tops",
    price: 999,
    images: [
        "https://i.pinimg.com/564x/2c/31/58/2c31589a1f736a4457e51c8b3552d430.jpg"
    ],
    description: "A stylish and chic black sleeveless top with elegant ruffle details on the neckline.",
    details: ["Polyester", "V-Neck", "Sleeveless", "Ruffle Detail"]
  }
];
