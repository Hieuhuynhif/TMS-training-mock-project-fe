import { Error } from "@/app/_types/Error";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../../../../config/axios";
import PATH from "../../_constants/PATH";
import CustomNotification from "../common/CustomNotification";
import TextFieldController from "../controllers/TextFieldController";

type Props = {
  onCloseForm: () => void;
};

export default function AddItemForm({ onCloseForm }: Props) {
  const { handleSubmit, control } = useForm();
  const [notification, setNotification] = useState<string>("");
  const router = useRouter();

  const handleOnSubmit = async (values: object) => {
    try {
      await axiosClient.post(PATH.ITEMS, values);
      onCloseForm();
      router.push("/admin/items");
    } catch (error) {
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2}>
        <TextFieldController control={control} label="Name" name="name" />
        <TextFieldController control={control} label="Price" name="price" />
        <Button type="submit">Add</Button>
      </Stack>
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </form>
  );
}
