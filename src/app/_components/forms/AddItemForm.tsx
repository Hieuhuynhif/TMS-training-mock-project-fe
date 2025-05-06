import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { axiosClient } from "../../../../config/axios";
import PATH from "../../_constants/PATH";
import TextFieldController from "../controllers/TextFieldController";

type Props = {
  onCloseForm: () => void;
};

export default function AddItemForm({ onCloseForm }: Props) {
  const { handleSubmit, control } = useForm();

  const handleOnSubmit = async (values: object) => {
    await axiosClient.post(PATH.ITEMS, values);
    onCloseForm();
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Stack spacing={2}>
        <TextFieldController control={control} label="Name" name="name" />
        <TextFieldController control={control} label="Price" name="price" />
        <Button type="submit">Add</Button>
      </Stack>
    </form>
  );
}
