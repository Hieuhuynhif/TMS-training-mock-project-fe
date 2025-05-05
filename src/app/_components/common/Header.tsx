"use client";

import { Api, History, ShoppingCart } from "@mui/icons-material";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) setIsLogin(false);
  }, []);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      height={"100%"}
      alignItems={"center"}
    >
      <Avatar variant="square" sx={{ bgcolor: "#111111" }}>
        <Api />
      </Avatar>
      <Stack direction={"row"}>
        <IconButton onClick={() => router.push("/orders")}>
          <History />
        </IconButton>
        <IconButton onClick={() => router.push("/carts")}>
          <ShoppingCart />
        </IconButton>
        {isLogin ? (
          <Button
            onClick={() => {
              localStorage.setItem("accessToken", "");
              localStorage.setItem("isLogin", "");
              router.push("/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </Stack>
    </Stack>
  );
}

export default Header;
