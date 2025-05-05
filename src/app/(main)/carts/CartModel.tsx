import Product from "../products/ProductModel";

type CartDetails = {
  id: number;
  quantity: number;
  item: Product;
  addedDate: Date;
};

type Cart = {
  id: number;
  listCartDetails: CartDetails[];
};

export type { Cart, CartDetails };
