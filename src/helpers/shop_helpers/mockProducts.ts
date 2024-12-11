import { CartItem } from "@/_common/interfaces/CartItem";

export const mockProducts: CartItem[] = [
  {
    _id: 'product1',
    name: 'Product 1',
    description: 'Description of Product 1',
    image: 'image1.png',
    type: 'ingredient',
    qty: 1,
    value: 10,
  },
  {
    _id: 'product2',
    name: 'Product 2',
    description: 'Description of Product 2',
    image: 'image2.png',
    type: 'ingredient',
    qty: 1,
    value: 20,
  },
  {
    _id: 'product3',
    name: 'Product 3',
    description: 'Description of Product 3',
    image: 'image3.png',
    type: 'ingredient',
    qty: 1,
    value: 30,
  },
];
