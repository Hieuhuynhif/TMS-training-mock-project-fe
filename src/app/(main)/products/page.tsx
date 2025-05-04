import ItemCard from "@/app/_components/common/ItemCard";
import { Container, Stack } from "@mui/material";
import { axiosInstance } from "../../../../config/axios";
import PATH from "../../_constants/PATH";
import Product from "./ProductModel";

export const revalidate = 60;

async function products() {
  const products: Product[] = await axiosInstance.get(
    PATH.BASE_URL + PATH.ITEMS
  );

  return (
    <Container>
      <Stack direction={"row"} flexWrap={"wrap"} gap={2} p={2}>
        {products.map((product) => (
          <ItemCard item={product} key={product.id} />
        ))}
      </Stack>
    </Container>
  );
}

export default products;
