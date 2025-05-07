"use client";

import { Api } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonAccount from "./ButtonAccount";

export function Header() {
  const router = useRouter();

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      height={"100%"}
      alignItems={"center"}
    >
      <SessionProvider>
        <IconButton
          onClick={() => {
            const isLogin = localStorage.getItem("isLogin");
            if (isLogin == "ROLE_ADMIN") router.push("/admin/items");
            else router.push("/products");
          }}
        >
          <Api color="secondary" />
        </IconButton>
        <ButtonAccount />
      </SessionProvider>
    </Stack>
  );
}

export default Header;
