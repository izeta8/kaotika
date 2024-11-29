import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAllProducts } from './productsService';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const allProducts = await fetchAllProducts();
    res.status(200).json(allProducts);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

//////////////DISCONNECT mongoose////////////////
