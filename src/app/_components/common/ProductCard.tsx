"use client";

import { Cart } from "@/app/(main)/carts/CartModel";
import Product from "@/app/(main)/products/ProductModel";
import PATH from "@/app/_constants/PATH";
import { Error } from "@/app/_types/Error";
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
import { useState } from "react";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";
import CustomNotification from "./CustomNotification";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const [notification, setNotification] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const fetcher = useFetcher({
    callback: (): Promise<Cart> =>
      axiosClient.post(PATH.CARTS, {
        itemId: product.id,
        quantity: 1,
      }),
  });

  const handleAddCart = async () => {
    try {
      const cart = await fetcher();

      mutate(PATH.CARTS, cart, false);
    } catch (error) {
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };

  return (
    <>
      <Card key={product.id}>
        <CardActionArea
          onClick={() => router.push(`${pathname}/${product.id}`)}
        >
          <CardHeader title={product.name} subheader={`$ ${product.price}`} />
          <CardMedia
            component="img"
            height="194"
            image="/images/item.jpg"
            title="green iguana"
          />
        </CardActionArea>
        <CardActions>
          <IconButton onClick={handleAddCart}>
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </>
  );
}

export default ProductCard;
