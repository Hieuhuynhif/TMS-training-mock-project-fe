import ItemCard from "@/app/_components/common/ItemCard";
import { Container, Stack, Typography } from "@mui/material";
import AddItem from "../../_components/common/AddItem";
import PATH from "../../_constants/PATH";
import Item from "./ItemModel";

export const revalidate = 60;

async function page() {
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS, {
    headers: {
      "TMS-CONNECT-KEY": "tms-connect-key",
    },
  });
  const items: Item[] = await res.json();

  return (
    <Container>
      <Typography fontSize={"2rem"}>Items</Typography>

      <AddItem />
      <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
        {items.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </Stack>
    </Container>
  );
}

export default page;
