import ProductCard from "@/app/_components/common/ProductCard";
import { Container, Stack } from "@mui/material";
import PATH from "../../_constants/PATH";
import Product from "./ProductModel";

export const revalidate = 60;

async function products() {
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS);
  const products: Product[] = await res.json();

  return (
    <Container>
      <Stack direction={"row"} flexWrap={"wrap"} gap={2} p={2}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Stack>
    </Container>
  );
}

export default products;
