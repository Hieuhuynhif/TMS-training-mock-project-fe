"use client";

import { TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  validate?: RegisterOptions["validate"];
};

function TextFieldController<T extends FieldValues>({
  control,
  name,
  label,
  validate,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Required", validate: validate }}
      render={({ field: { onChange }, fieldState: { error } }) => {
        return (
          <TextField
            label={label}
            onChange={(e) => onChange(e.target.value)}
            error={!!error}
            helperText={error?.message ?? " "}
          />
        );
      }}
    />
  );
}

export default TextFieldController;
