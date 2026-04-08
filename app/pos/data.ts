export const CATEGORIES = ["All", "Mains", "Sides", "Drinks"];

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number; // The new property for tracking inventory
}

export const MENU_ITEMS: Product[] = [
  {
    id: 1,
    name: "Jollof Rice & Chicken",
    price: 4500,
    category: "Mains",
    image: "/images/jollof.jpg",
    stock: 50, // Starting stock level
  },
  {
    id: 2,
    name: "Pounded Yam & Egusi",
    price: 8500,
    category: "Mains",
    image: "/images/pounded yam.jpg",
    stock: 30,
  },
  {
    id: 3,
    name: "Fried Rice Special",
    price: 10000,
    category: "Mains",
    image: "/images/easy-fried-rice.jpg",
    stock: 25,
  },
  {
    id: 4,
    name: "Plantain Side",
    price: 4000,
    category: "Sides",
    image: "/images/plantain.jpg",
    stock: 100,
  },
  {
    id: 5,
    name: "Moin Moin",
    price: 1500,
    category: "Sides",
    image: "/images/moin moin.jpg",
    stock: 40,
  },
  {
    id: 6,
    name: "Cold Malt",
    price: 800,
    category: "Drinks",
    image: "/images/malt.jpg",
    stock: 60,
  },
  {
    id: 7,
    name: "Fresh Juice",
    price: 3000,
    category: "Drinks",
    image: "/images/fresh juice.jpg",
    stock: 20,
  },
  {
    id: 8,
    name: "Water",
    price: 500,
    category: "Drinks",
    image: "/images/Water.jpg",
    stock: 150,
  },
];