"use client";

import AddOrderButton from "@/app/_components/common/AddOrderButton";
import CartItem from "@/app/_components/common/CartItem";
import PATH from "@/app/_constants/PATH";
import { Container, List, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { axiosClient } from "../../../../config/axios";
import { Cart } from "./CartModel";
import Loading from "./loading";

function Page() {
  const { data, isLoading } = useSWR<Cart>(
    PATH.CARTS,
    (url: string): Promise<Cart> => axiosClient.get(url)
  );

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Typography fontSize={"2rem"}>Cart</Typography>

      <List>
        {(data?.listCartDetails ?? []).map((cartDetail) => (
          <CartItem key={cartDetail.id} cartDetail={cartDetail} />
        ))}
      </List>
      {!!data?.listCartDetails.length ? (
        <Stack alignItems={"end"}>
          <AddOrderButton />
        </Stack>
      ) : (
        "<Empty>"
      )}
    </Container>
  );
}

export default Page;
