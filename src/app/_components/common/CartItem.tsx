import { CartDetails } from "@/app/(main)/carts/CartModel";
import PATH from "@/app/_constants/PATH";
import { Add, Delete, Remove } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";

type Props = {
  cartDetail: CartDetails;
};

function CartItem({ cartDetail }: Props) {
  const handleAddItem = async () => {
    try {
      await axiosClient.put(PATH.CARTS, {
        itemId: cartDetail.item.id,
        quantity: cartDetail.quantity + 1,
      });
      mutate(PATH.CARTS);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };
  const handleRemoveItem = async () => {
    try {
      await axiosClient.delete(PATH.CARTS + "/" + cartDetail.id);
      mutate(PATH.CARTS);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton color="warning" onClick={handleRemoveItem}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemText sx={{ width: "10%" }}>ID: {cartDetail.id}</ListItemText>
      <ListItemText sx={{ width: "40%" }}>
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
  );
}

export default CartItem;
