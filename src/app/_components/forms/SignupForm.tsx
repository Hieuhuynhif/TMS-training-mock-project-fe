"use client";

import PATH from "@/app/_constants/PATH";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../../config/axios";
import TextFieldController from "../controllers/TextFieldController";

function SignupForm() {
  const { handleSubmit, control, watch } = useForm();

  const password = watch("password");

  const router = useRouter();

  const handleSignupClick = async (values: object) => {
    try {
      await axiosInstance.post(PATH.BASE_URL + PATH.SIGNUP, values);
      router.push(PATH.LOGIN);
    } catch (e) {
      console.log(e);
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
        />
        <TextFieldController
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          validate={(value) => {
            if (value != password) return "Password is not match";
          }}
        />
        <Stack>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default SignupForm;
