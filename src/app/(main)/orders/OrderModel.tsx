import Product from "../products/ProductModel";

type OrderDetails = {
  id: number;
  quantity: number;
  item: Product;
};

type Order = {
  id: number;
  orderDate: Date;
  listOrderDetails: OrderDetails[];
};

export type { Order, OrderDetails };
