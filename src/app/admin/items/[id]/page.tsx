import DeleteButton from "@/app/_components/common/DeleteButton";
import PATH from "@/app/_constants/PATH";
import { Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Item from "../ItemModel";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: number }>;
};

async function page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(PATH.BASE_URL + PATH.ITEMS + "/" + id, {
    headers: {
      "TMS-CONNECT-KEY": "tms-connect-key",
    },
  });
  const item: Item = await res.json();

  return (
    <Container>
      <Typography fontSize={"2rem"}>Item Details</Typography>

      <Stack>
        <Image
          alt={item.name}
          src={"/images/item.jpg"}
          width={500}
          height={300}
          style={{
            borderRadius: "10px",
          }}
          priority
        />
        <Typography>ID: {item.id}</Typography>
        <Typography>Name: {item.name}</Typography>
        <Typography>${item.price}</Typography>
        <Button color="primary">Edit</Button>
        <DeleteButton
          url={PATH.ITEMS + "/" + id}
          backUrl={"/admin" + PATH.ITEMS}
        />
      </Stack>
    </Container>
  );
}

export default page;
