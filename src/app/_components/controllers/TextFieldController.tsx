"use client";

import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
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
  type?: HTMLInputTypeAttribute;
};

function TextFieldController<T extends FieldValues>({
  control,
  name,
  label,
  validate,
  type,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Required", validate: validate }}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            label={label}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            error={!!error}
            helperText={error?.message ?? " "}
            type={type}
          />
        );
      }}
    />
  );
}

export default TextFieldController;
