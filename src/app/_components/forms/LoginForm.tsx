"use client";

import { GitHub, Google, Home } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextFieldController from "../controllers/TextFieldController";

type User = {
  username: string | null;
  password: string | null;
};

function LoginForm() {
  const { handleSubmit, control } = useForm<User>();
  const router = useRouter();

  const handleLoginClick = async (values: User) => {
    try {
      await signIn("credentials", { ...values });
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
        <Stack spacing={2}>
          <Button type="submit" variant="contained">
            Login
          </Button>

          <Button
            onClick={async () => {
              await signIn("github");
            }}
            startIcon={<GitHub />}
            color="error"
            variant="outlined"
          >
            github
          </Button>
          <Button
            onClick={async () => {
              await signIn("google");
            }}
            startIcon={<Google />}
            color="secondary"
            variant="outlined"
          >
            google
          </Button>
          <Button onClick={() => router.push("/signup")}>Join Us?</Button>
          <Button onClick={() => router.push("/")} startIcon={<Home />}>
            Home
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default LoginForm;
