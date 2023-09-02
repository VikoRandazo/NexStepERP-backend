export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stockQuantity: number;
  manufacturer?: string;
};

export default Product;
