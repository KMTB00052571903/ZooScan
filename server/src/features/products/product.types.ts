
export interface Scan {
  id: string;
  visitor_id: string;
  animal_id: string;
  created_at: string;
}

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   storeId: string;
// }

export interface CreateProductDTO {
  name: string;
  price: number;
  storeId: string;
}

export interface UpdateProductDTO {
  id: string;
  name?: string;
  price?: number;
}