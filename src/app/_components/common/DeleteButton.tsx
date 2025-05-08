"use client";

import { Button } from "@mui/material";
import { axiosClient } from "../../../../config/axios";
import useFetcher from "../../../../config/useFetcher";

type Props = {
  url: string;
};

export default function DeleteButton({ url }: Props) {
  const fetcher = useFetcher({
    callback: () => axiosClient.delete(url),
  });
  const handleDelete = async () => {
    try {
      await fetcher();
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
