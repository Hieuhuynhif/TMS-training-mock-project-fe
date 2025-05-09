import { CartDetails } from "@/app/(main)/carts/CartModel";
import PATH from "@/app/_constants/PATH";
import { Error } from "@/app/_types/Error";
import { Add, Delete, Remove } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";
import CustomNotification from "./CustomNotification";

type Props = {
  cartDetail: CartDetails;
};

function CartItem({ cartDetail }: Props) {
  const [notification, setNotification] = useState<string>("");

  const handleAddItem = async () => {
    try {
      await axiosClient.put(PATH.CARTS, {
        itemId: cartDetail.item.id,
        quantity: cartDetail.quantity + 1,
      });
      mutate(PATH.CARTS);
    } catch (error) {
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };
  const handleSubItem = async () => {
    try {
      await axiosClient.put(PATH.CARTS, {
        itemId: cartDetail.item.id,
        quantity: cartDetail.quantity - 1,
      });
      mutate(PATH.CARTS);
    } catch (error) {
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };
  const handleRemoveItem = async () => {
    try {
      await axiosClient.delete(PATH.CARTS + "/" + cartDetail.id);
      mutate(PATH.CARTS);
    } catch (error) {
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton color="warning" onClick={handleRemoveItem}>
            <Delete />
          </IconButton>
        }
        divider
      >
        <ListItemAvatar sx={{ width: "20%" }}>
          <Image
            alt={cartDetail.item.name}
            height={120}
            width={120}
            src={"/images/item.jpg"}
            style={{ borderRadius: "10px" }}
            priority
          />
        </ListItemAvatar>
        <ListItemText sx={{ width: "10%" }}>ID: {cartDetail.id}</ListItemText>
        <ListItemText sx={{ width: "30%" }}>
          Item: {cartDetail.item.name}
        </ListItemText>
        <ListItemText sx={{ width: "20%" }}>
          Price: {cartDetail.item.price}
        </ListItemText>
        <ListItemIcon sx={{ width: "20%" }}>
          <IconButton onClick={handleSubItem}>
            <Remove />
          </IconButton>
          <Typography width={"50%"} textAlign={"center"} lineHeight={3}>
            Qty: {cartDetail.quantity}
          </Typography>
          <IconButton onClick={handleAddItem}>
            <Add />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </>
  );
}

export default CartItem;
