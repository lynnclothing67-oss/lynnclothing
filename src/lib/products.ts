
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
      "https://i.pinimg.com/564x/e8/52/63/e852631581452b489a0a1492a5411516.jpg",
      "https://i.pinimg.com/564x/41/0d/17/410d1736b132c34d288d07e66d488f5a.jpg",
    ],
    description: "A beautiful ready-to-wear Salwar suit in a lovely pink shade, perfect for festive occasions. The fine cotton fabric ensures comfort all day long.",
    details: ["Pure Cotton", "Embroidered Neckline", "Comes with matching Dupatta", "Comfort Fit"],
  },
  {
    id: "2",
    name: "Royal Blue Party Gown",
    category: "party wear 3 piece",
    price: 5999,
    discount: 25,
    images: [
      "https://i.pinimg.com/564x/8a/1c/64/8a1c6431215b29388f8c8577112b3e83.jpg",
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
      "https://i.pinimg.com/564x/b8/63/0f/b8630f56f17e7d566373ce02b9b6da89.jpg",
    ],
    description: "A comfortable and stylish striped top for everyday wear. Pairs perfectly with jeans or skirts.",
    details: ["Cotton Blend", "Round Neck", "Half Sleeves", "Regular Fit"],
  },
  {
    id: "4",
    name: "Chic Western Dress",
    category: "western wear",
    price: 2499,
    discount: 20,
    images: [
      "https://i.pinimg.com/564x/49/2f/1b/492f1b0c950a41d595d24d2629f1249b.jpg",
      "https://i.pinimg.com/564x/c9/79/11/c979116e453ac870c978b77d61c6f379.jpg",
    ],
    description: "A modern and chic A-line western dress, perfect for a day out or a casual evening.",
    details: ["Crepe Fabric", "A-Line Cut", "Knee-Length", "Concealed Zipper"],
  },
  {
    id: "5",
    name: "Classic Blue Jeans",
    category: "jeans",
    price: 1999,
    discount: 5,
    images: [
        "https://i.pinimg.com/564x/3b/68/73/3b687353f4841961e685f0c727092895.jpg",
        "https://i.pinimg.com/564x/f3/d2/31/f3d231945f886f03d5b0a3c26b527589.jpg"
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
        "https://i.pinimg.com/564x/60/d4/62/60d4620a232f05a109a909670d8a56f6.jpg"
    ],
    description: "A trendy button-front denim skirt that pairs well with any top, from casual tees to elegant blouses.",
    details: ["Stretchable Denim", "Button-front", "Mini Length", "High Waist"]
  },
  {
    id: "7",
    name: "Unstitched Silk Salwar Material",
    category: "salwar material",
    price: 2999,
    discount: 18,
    images: [
        "https://i.pinimg.com/564x/5a/0e/9c/5a0e9c3235940f5a70678b8719f964a2.jpg"
    ],
    description: "High-quality unstitched silk salwar material in vibrant colors to create your own unique, custom-tailored design.",
    details: ["Pure Silk", "Includes Top, Bottom, and Dupatta fabric", "Vibrant Colors", "Soft Texture"]
  },
  {
    id: "8",
    name: "Printed Cotton Running Material",
    category: "running materials",
    price: 399,
    discount: 12,
    images: [
        "https://i.pinimg.com/564x/52/68/9c/52689c381c853504886676f3f03bf650.jpg"
    ],
    description: "Versatile printed cotton fabric, sold by the meter. Ideal for creating custom dresses, kurtis, blouses, and more.",
    details: ["100% Cotton", "44-inch width", "Sold per meter", "Breathable Fabric"]
  },
  {
    id: "9",
    name: "Bandhani Print Dupatta",
    category: "duppattas",
    price: 799,
    discount: 30,
    images: [
        "https://i.pinimg.com/564x/be/99/38/be99388d752932f913a077478b0244a2.jpg"
    ],
    description: "A beautiful Bandhani print art silk dupatta to accessorize your ethnic outfits and add a pop of color.",
    details: ["Art Silk", "Traditional Tie-Dye Print", "Tasseled Edges", "Lightweight"]
  },
  {
    id: "10",
    name: "Green Georgette Salwar",
    category: "salwar readymade",
    price: 3299,
    images: [
        "https://i.pinimg.com/564x/24/76/9a/24769a7122e23a3c20c04a2d8b4e4706.jpg"
    ],
    description: "An elegant readymade salwar suit in a beautiful shade of green georgette, fully lined for comfort.",
    details: ["Georgette", "Lined", "Full Sleeves", "Comes with matching Churidar"],
    discount: 22
  },
   {
    id: "11",
    name: "Black Ruffle Top",
    category: "tops",
    price: 999,
    discount: 15,
    images: [
        "https://i.pinimg.com/564x/23/9c/e6/239ce680879f3e4c8d5c48b29e01fbff.jpg"
    ],
    description: "A stylish and chic black sleeveless top with elegant ruffle details on the neckline.",
    details: ["Polyester", "V-Neck", "Sleeveless", "Ruffle Detail"]
  }
];
