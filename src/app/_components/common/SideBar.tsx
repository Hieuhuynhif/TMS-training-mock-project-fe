"use client";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();
  return (
    <Stack p={4}>
      <Button onClick={() => router.push("/admin/items")}>Item</Button>
    </Stack>
  );
}

export default SideBar;
