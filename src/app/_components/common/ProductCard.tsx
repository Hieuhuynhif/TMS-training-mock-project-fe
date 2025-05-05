"use client";

import Cart from "@/app/(main)/carts/CartModel";
import Product from "@/app/(main)/products/ProductModel";
import PATH from "@/app/_constants/PATH";
import { AddShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddCart = async () => {
    try {
      const isLogin = localStorage.getItem("isLogin");
      if (!isLogin) {
        return router.push("/login");
      }
      const cart: Cart = await axiosClient.post(PATH.CARTS, {
        itemId: product.id,
        quantity: 1,
      });

      mutate(PATH.CARTS, cart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card key={product.id}>
      <CardActionArea onClick={() => router.push(`${pathname}/${product.id}`)}>
        <CardHeader title={product.name} subheader={`$ ${product.price}`} />
        <CardMedia
          component="img"
          height="194"
          image="/images/item.png"
          title="green iguana"
        />
      </CardActionArea>
      <CardActions>
        <IconButton onClick={handleAddCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
