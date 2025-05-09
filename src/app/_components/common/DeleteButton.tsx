"use client";

import { Error } from "@/app/_types/Error";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";
import CustomNotification from "./CustomNotification";

type Props = {
  url: string;
  backUrl: string;
};

export default function DeleteButton({ url, backUrl }: Props) {
  const router = useRouter();
  const [notification, setNotification] = useState<string>("");

  const fetcher = useFetcher({
    callback: () => axiosClient.delete(url),
  });
  const handleDelete = async () => {
    try {
      await fetcher();
      if (backUrl) router.push(backUrl);
    } catch (e) {
      setNotification((e as Error).response?.data?.message ?? "");
    }
  };
  return (
    <>
      <Button color="error" onClick={handleDelete}>
        Delete
      </Button>
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </>
  );
}
