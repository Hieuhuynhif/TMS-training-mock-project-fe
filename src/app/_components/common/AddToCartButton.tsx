"use client";
import { Cart } from "@/app/(main)/carts/CartModel";
import PATH from "@/app/_constants/PATH";
import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";

type Props = {
  itemId: number;
  quantity: number;
};

const AddToCartButton = ({ itemId, quantity }: Props) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      const isLogin = localStorage.getItem("isLogin");
      if (!isLogin) {
        return router.push("/login");
      }
      const cart: Cart = await axiosClient.post(PATH.CARTS, {
        itemId,
        quantity,
      });
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
