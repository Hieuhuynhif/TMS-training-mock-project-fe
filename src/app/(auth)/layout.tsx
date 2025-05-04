"use client";

import { Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();

  useLayoutEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      if (isLogin == "ROLE_ADMIN") router.push("/admin/items");
      else router.push("/products");
    }
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        padding: "15vh 30vw",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        sx={{
          height: "100%",
          bgcolor: "#fff",
          p: 3,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

export default Layout;
