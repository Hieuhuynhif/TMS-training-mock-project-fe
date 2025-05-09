import { Cart } from "@/app/(main)/carts/CartModel";
import PATH from "@/app/_constants/PATH";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";

function CartIconButton() {
  const router = useRouter();

  const fetcher = useFetcher({
    callback: (url: string): Promise<Cart> => axiosClient.get(url),
  });
  const cart = useSWR(PATH.CARTS, fetcher);

  return (
    <IconButton onClick={() => router.push("/carts")}>
      <Badge
        badgeContent={cart?.data?.listCartDetails?.length}
        color="secondary"
      >
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
}

export default CartIconButton;
