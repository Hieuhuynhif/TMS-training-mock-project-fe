"use client";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

function Menu() {
  const router = useRouter();

  return (
    <Stack direction={"row-reverse"} p={2} spacing={2}>
      <Button variant="outlined" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button variant="contained" onClick={() => router.push("/signup")}>
        Sign up
      </Button>
    </Stack>
  );
}

export default Menu;
