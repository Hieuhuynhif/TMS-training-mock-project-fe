"use client";

import { TextField } from "@mui/material";
import { Control, Controller, RegisterOptions } from "react-hook-form";

type Props = {
  control: Control;
  name: string;
  label: string;
  validate?: RegisterOptions["validate"];
};

function TextFieldController({ control, name, label, validate }: Props) {
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
