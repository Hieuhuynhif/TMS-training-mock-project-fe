import { Error } from "@/app/_types/Error";
import Item from "@/app/admin/items/ItemModel";
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
  item: Item;
};

export default function EditItemForm({ onCloseForm, item }: Props) {
  const { handleSubmit, control } = useForm<Item>({ defaultValues: item });
  const [notification, setNotification] = useState<string>("");
  const router = useRouter();

  const handleOnSubmit = async (values: object) => {
    try {
      await axiosClient.put(PATH.ITEMS + "/" + `${item.id}`, values);
      onCloseForm();
      router.push("/admin/items");
    } catch (error) {
      if ((error as Error).status == 401) {
        router.push("/login");
        localStorage.setItem("isUserExpired", "1");
        return;
      }
      setNotification((error as Error)?.response?.data?.message ?? "");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2}>
        <TextFieldController control={control} label="Name" name="name" />
        <TextFieldController control={control} label="Price" name="price" />
        <Button type="submit">Save</Button>
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
