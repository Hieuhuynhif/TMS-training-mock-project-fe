"use client";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../../config/axios";
import PATH from "../../_constants/PATH";
import TextFieldController from "../controllers/TextFieldController";

type User = {
  id: string;
  username: string;
  accessToken: string;
  role: string;
};

function LoginForm() {
  const { handleSubmit, control } = useForm();

  const router = useRouter();

  const handleLoginClick = async (values: object) => {
    try {
      const user: User = await axiosInstance.post(PATH.LOGIN, values);

      localStorage.setItem("accessToken", user?.accessToken);

      if (user?.role == "ROLE_ADMIN") {
        localStorage.setItem("isLogin", user.role);
        router.push("/admin/items");
      } else {
        router.push("/products");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginClick)}>
      <Stack spacing={2}>
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
        <Stack>
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button onClick={() => router.push("/signup")}>Join Us?</Button>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default LoginForm;
