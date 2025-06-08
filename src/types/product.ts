export type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  producer_name: string;
  producer_email: string;
  cover: string;
  thumbnail: string;
  price: number;
  updated_at: string;
  created_at: string;
};

export type ProductRequestBody = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
