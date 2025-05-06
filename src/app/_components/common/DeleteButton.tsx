"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";

type Props = {
  url: string;
  backUrl: string;
};

export default function DeleteButton({ url, backUrl }: Props) {
  const router = useRouter();
  const fetcher = useFetcher({
    callback: () => axiosClient.delete(url),
  });
  const handleDelete = async () => {
    try {
      await fetcher();
      router.push(backUrl);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
}
