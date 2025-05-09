"use client";

import { Api, History } from "@mui/icons-material";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CartIconButton from "./CartIconButton";

function HeaderDetails() {
  const router = useRouter();
  const { data } = useSession();

  return (
    <>
      <IconButton
        onClick={() => {
          if (data?.user?.role == "ROLE_ADMIN") router.push("/admin/items");
          else if (data?.user?.role == "ROLE_CUSTOMER")
            router.push("/products");
          else return;
        }}
      >
        <Api color="secondary" />
      </IconButton>

      <Stack direction={"row"} spacing={3} p={2} alignItems={"center"}>
        {data?.user.role == "ROLE_CUSTOMER" && (
          <>
            <IconButton onClick={() => router.push("/orders")}>
              <History />
            </IconButton>
            <CartIconButton />
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
              localStorage.setItem("isUserExpired", "1");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </Stack>
    </>
  );
}

export default HeaderDetails;
