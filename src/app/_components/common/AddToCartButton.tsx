"use client";

import { Cart } from "@/app/(main)/carts/CartModel";
import PATH from "@/app/_constants/PATH";
import { Error } from "@/app/_types/Error";
import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";
import CustomNotification from "./CustomNotification";

type Props = {
  itemId: number;
  quantity: number;
};

const AddToCartButton = ({ itemId, quantity }: Props) => {
  const [notification, setNotification] = useState<string>("");

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
      mutate(PATH.CARTS, cart, false);
    } catch (error) {
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };
  return (
    <>
      <Button
        startIcon={<AddShoppingCart />}
        color="primary"
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </>
  );
};

export default AddToCartButton;
