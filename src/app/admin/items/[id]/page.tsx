import DeleteButton from "@/app/_components/common/DeleteButton";
import PATH from "@/app/_constants/PATH";
import { Button, Stack, Typography } from "@mui/material";
import Item from "../ItemModel";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: number }>;
};

async function page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS + "/" + id);
  const item: Item = await res.json();

  return (
    <Stack>
      <Typography>ID: {item.id}</Typography>
      <Typography>Name: {item.name}</Typography>
      <Typography>${item.price}</Typography>
      <Button color="primary">Edit</Button>
      <DeleteButton
        url={PATH.BASE_URL + PATH.ITEMS + "/" + id}
        backUrl={"/admin/items"}
      />
    </Stack>
  );
}

export default page;
