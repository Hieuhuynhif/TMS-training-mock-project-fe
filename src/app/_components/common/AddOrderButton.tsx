import PATH from "@/app/_constants/PATH";
import { Button } from "@mui/material";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";

function AddOrderButton() {
  const handleAddOrder = async () => {
    try {
      await axiosClient.post(PATH.ORDERS);
      mutate(PATH.CARTS);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleAddOrder}>Order</Button>;
}

export default AddOrderButton;
