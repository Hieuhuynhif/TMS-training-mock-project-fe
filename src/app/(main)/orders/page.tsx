"use client";

import OrderItem from "@/app/_components/common/OrderItem";
import PATH from "@/app/_constants/PATH";
import {
  Container,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { axiosClient } from "../../../../config/axios";
import { Order } from "./OrderModel";
import Loading from "./loading";

function Page() {
  const { data, isLoading } = useSWR<Order[]>(
    PATH.ORDERS,
    (url: string): Promise<Order[]> => axiosClient.get(url),
    { suspense: true }
  );
  
  if (isLoading) return <Loading />;

  if (data)
    return (
      <Container>
        <List>
          {data?.map((order) => (
            <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
              <ListItemText
                primary={<Typography>ORDER ID: #{order.id}</Typography>}
                secondary={
                  <Typography>
                    Date: {new Date(order.orderDate).toLocaleString()}
                  </Typography>
                }
              />
              {order?.listOrderDetails.map((orderDetails) => (
                <OrderItem key={orderDetails.id} orderDetail={orderDetails} />
              ))}
            </Paper>
          ))}
        </List>
      </Container>
    );
}

export default Page;
