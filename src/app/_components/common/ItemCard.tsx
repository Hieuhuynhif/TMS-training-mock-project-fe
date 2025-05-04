"use client";

import Product from "@/app/(main)/products/ProductModel";
import Item from "@/app/admin/items/ItemModel";
import { Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  item: Item | Product;
};

function ItemCard({ item }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card key={item.id}>
      <CardActionArea onClick={() => router.push(`${pathname}/${item.id}`)}>
        <CardHeader title={item.name} subheader={`$ ${item.price}`} />
        <CardMedia
          component="img"
          height="194"
          image="/images/item.png"
          title="green iguana"
        />
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
