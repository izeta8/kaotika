import { fetchAllProducts } from './productsService';

export default async function handler(req, res) {
  try {
    const allProducts = await fetchAllProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
}

//////////////DISCONNECT mongoose////////////////
