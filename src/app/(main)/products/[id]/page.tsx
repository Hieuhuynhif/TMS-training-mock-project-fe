import AddToCartButton from "@/app/_components/common/AddToCartButton";
import PATH from "@/app/_constants/PATH";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Product from "../ProductModel";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

async function page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS + "/" + id, {
    headers: {
      "TMS-CONNECT-KEY": "tms-connect-key",
    },
  });
  const product: Product = await res.json();

  return (
    <Container>
      <Typography fontSize={"2rem"}>Product Details</Typography>

      <Stack spacing={2}>
        <Image
          alt={product.name}
          src={"/images/item.jpg"}
          width={500}
          height={300}
          style={{
            borderRadius: "10px",
          }}
          priority
        />
        <Typography>ID: {product.id}</Typography>
        <Typography>Name: {product.name}</Typography>
        <Typography>${product.price}</Typography>
        <AddToCartButton itemId={product.id} quantity={1} />
      </Stack>
    </Container>
  );
}

export default page;
