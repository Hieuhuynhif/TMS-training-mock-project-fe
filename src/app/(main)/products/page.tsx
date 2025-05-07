import ProductCard from "@/app/_components/common/ProductCard";
import { Container, Stack, Typography } from "@mui/material";
import PATH from "../../_constants/PATH";
import Product from "./ProductModel";

export const revalidate = 60;

async function products() {
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS, {
    headers: {
      "TMS-CONNECT-KEY": "tms-connect-key",
    },
  });
  const products: Product[] = await res.json();

  return (
    <Container>
      <Typography fontSize={"2rem"}>Products</Typography>

      <Stack direction={"row"} flexWrap={"wrap"} gap={2} p={2}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Stack>
    </Container>
  );
}

export default products;
