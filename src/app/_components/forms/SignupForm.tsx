"use client";

import PATH from "@/app/_constants/PATH";
import { Error } from "@/app/_types/Error";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../../config/axios";
import CustomNotification from "../common/CustomNotification";
import TextFieldController from "../controllers/TextFieldController";

function SignupForm() {
  const { handleSubmit, control, watch } = useForm();

  const password = watch("password");

  const router = useRouter();
  const [notification, setNotification] = useState<string>("");

  const handleSignupClick = async (values: object) => {
    try {
      await axiosInstance.post(PATH.BASE_URL + PATH.SIGNUP, values);
      router.push("/login");
    } catch (e) {
      setNotification((e as Error)?.response?.data?.message ?? "");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignupClick)}>
      <Stack spacing={1}>
        <TextFieldController
          control={control}
          name="username"
          label="Username"
        />
        <TextFieldController
          control={control}
          name="password"
          label="Password"
          type="password"
        />
        <TextFieldController
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          validate={(value) => {
            if (value != password) return "Password is not match";
          }}
        />
        <Stack spacing={2}>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Stack>
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

export default SignupForm;
