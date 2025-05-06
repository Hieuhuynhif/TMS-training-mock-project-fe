"use client";

import { Cart } from "@/app/(main)/carts/CartModel";
import PATH from "@/app/_constants/PATH";
import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";

type Props = {
  itemId: number;
  quantity: number;
};

const AddToCartButton = ({ itemId, quantity }: Props) => {
  const fetcher = useFetcher({
    callback: (): Promise<Cart> =>
      axiosClient.post(PATH.CARTS, {
        itemId,
        quantity,
      }),
  });

  const handleAddToCart = async () => {
    try {
      const cart = await fetcher();
      mutate(PATH.CARTS, cart);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      startIcon={<AddShoppingCart />}
      color="primary"
      onClick={handleAddToCart}
    >
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
