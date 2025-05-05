import AddToCartButton from "@/app/_components/common/AddToCartButton";
import PATH from "@/app/_constants/PATH";
import { Stack, Typography } from "@mui/material";
import Product from "../ProductModel";

export const revalidate = 60;

type Props = {
  params: { id: string };
};

async function page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS + "/" + id);
  const product: Product = await res.json();

  return (
    <Stack>
      <Typography>ID: {product.id}</Typography>
      <Typography>Name: {product.name}</Typography>
      <Typography>${product.price}</Typography>
      <AddToCartButton itemId={product.id} quantity={1} />
    </Stack>
  );
}

export default page;
