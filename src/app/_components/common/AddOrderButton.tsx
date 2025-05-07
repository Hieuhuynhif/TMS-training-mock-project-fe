import { Order } from "@/app/(main)/orders/OrderModel";
import PATH from "@/app/_constants/PATH";
import { Button } from "@mui/material";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";

function AddOrderButton() {
  const fetcher = useFetcher({
    callback: (): Promise<Order> => axiosClient.post(PATH.ORDERS),
  });

  const handleAddOrder = async () => {
    try {
      const order = await fetcher();
      mutate(PATH.CARTS);
      mutate(PATH.ORDERS + "/lastest", order);
      mutate(PATH.ORDERS, undefined, true);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleAddOrder}>Order</Button>;
}

export default AddOrderButton;
