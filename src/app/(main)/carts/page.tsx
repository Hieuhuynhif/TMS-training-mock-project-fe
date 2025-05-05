"use client";

import AddOrderButton from "@/app/_components/common/AddOrderButton";
import CartItem from "@/app/_components/common/CartItem";
import PATH from "@/app/_constants/PATH";
import { Container, List, Stack } from "@mui/material";
import useSWR from "swr";
import { axiosClient } from "../../../../config/axios";
import { Cart } from "./CartModel";

function Page() {
  const { data } = useSWR<Cart>(
    PATH.CARTS,
    (url: string): Promise<Cart> => axiosClient.get(url)
  );

  return (
    <Container>
      <List>
        {(data?.listCartDetails ?? []).map((cartDetail) => (
          <CartItem key={cartDetail.id} cartDetail={cartDetail} />
        ))}
      </List>
      <Stack alignItems={"end"}>
        <AddOrderButton />
      </Stack>
    </Container>
  );
}

export default Page;
