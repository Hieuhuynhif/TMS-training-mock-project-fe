import { History, ShoppingCart } from "@mui/icons-material";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ButtonAccount() {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data?.user.role == "ROLE_ADMIN") router.push("/admin/items");
  });

  console.log(data);

  return (
    <Stack direction={"row"} spacing={3} p={2} alignItems={"center"}>
      {data?.user && (
        <>
          <IconButton onClick={() => router.push("/orders")}>
            <History />
          </IconButton>
          <IconButton onClick={() => router.push("/carts")}>
            <ShoppingCart />
          </IconButton>
        </>
      )}
      <Avatar
        alt={data?.user?.name ?? ""}
        src={data?.user?.image ?? ""}
        sx={{ width: 35, height: 35 }}
      />

      {data?.user ? (
        <Button
          onClick={async () => {
            await signOut({ callbackUrl: "/login" });
          }}
        >
          Logout
        </Button>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </Stack>
  );
}

export default ButtonAccount;
