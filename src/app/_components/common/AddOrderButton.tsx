import { Order } from "@/app/(main)/orders/OrderModel";
import PATH from "@/app/_constants/PATH";
import { Error } from "@/app/_types/Error";
import { Button } from "@mui/material";
import { useState } from "react";
import { mutate } from "swr";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";
import CustomNotification from "./CustomNotification";

function AddOrderButton() {
  const [notification, setNotification] = useState<string>("");

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
      setNotification((error as Error)?.response?.data?.message);
    }
  };

  return (
    <>
      <Button onClick={handleAddOrder}>Order</Button>;
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </>
  );
}

export default AddOrderButton;
