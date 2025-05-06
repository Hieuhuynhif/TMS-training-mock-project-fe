import { Order } from "@/app/(main)/orders/OrderModel";
import PATH from "@/app/_constants/PATH";
import { Button } from "@mui/material";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";

function AddOrderButton() {
  const handleAddOrder = async () => {
    try {
      const order: Order = await axiosClient.post(PATH.ORDERS);
      mutate(PATH.CARTS);
      mutate(PATH.ORDERS + "/lastestOrder", order);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleAddOrder}>Order</Button>;
}

export default AddOrderButton;
