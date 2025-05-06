"use client";

import OrderItem from "@/app/_components/common/OrderItem";
import PATH from "@/app/_constants/PATH";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { axiosClient } from "../../../../config/axios";
import { Order } from "./OrderModel";
import Loading from "./loading";

function Page() {
  const [isLastOrderView, setIsLastOrderView] = useState<boolean>(false);

  const { data, isLoading } = useSWR<Order[]>(
    PATH.ORDERS,
    (url: string): Promise<Order[]> => axiosClient.get(url)
  );

  const lastestOrder = useSWR(
    PATH.ORDERS + "/lastestOrder",
    (url: string): Promise<Order> => axiosClient.get(url)
  );

  if (isLoading || lastestOrder.isLoading) return <Loading />;

  return (
    <Container>
      <Typography fontSize={"2rem"}>Order History</Typography>
      <Button
        onClick={() => setIsLastOrderView(!isLastOrderView)}
        sx={{ mb: 2 }}
      >
        {isLastOrderView ? "All Orders" : "Lastest Orders"}
      </Button>

      <List>
        {(isLastOrderView ? [lastestOrder.data] : data)?.map((order) => (
          <Paper key={order?.id} sx={{ p: 2, mb: 2 }}>
            <ListItemText
              primary={
                <Typography fontWeight={600}>ORDER ID: #{order?.id}</Typography>
              }
              secondary={
                <Typography>
                  Date: {new Date(order?.orderDate ?? "").toLocaleString()}
                </Typography>
              }
            />
            {order?.listOrderDetails.map((orderDetails) => (
              <OrderItem key={orderDetails.id} orderDetail={orderDetails} />
            ))}
            <ListItem>
              <Typography fontWeight={500} ml={"80%"}>
                {" "}
                Total Price: $
                {order?.listOrderDetails.reduce((accumulate, cur) => {
                  return accumulate + cur.item.price * cur.quantity;
                }, 0)}
              </Typography>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default Page;
