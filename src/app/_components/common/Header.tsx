"use client";

import { Api, History, ShoppingCart } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<string | null>(null);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) setIsLogin(null);
    else setIsLogin(isLogin);
  }, []);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      height={"100%"}
      alignItems={"center"}
    >
      <IconButton
        onClick={() => {
          const isLogin = localStorage.getItem("isLogin");
          if (isLogin == "ROLE_ADMIN") router.push("/admin/items");
          else router.push("/products");
        }}
      >
        <Api color="secondary" />
      </IconButton>
      <Stack direction={"row"}>
        {isLogin == "ROLE_CUSTOMER" && (
          <>
            <IconButton onClick={() => router.push("/orders")}>
              <History />
            </IconButton>
            <IconButton onClick={() => router.push("/carts")}>
              <ShoppingCart />
            </IconButton>
          </>
        )}
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
