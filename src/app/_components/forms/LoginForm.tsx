"use client";

import { Error } from "@/app/_types/Error";
import { GitHub, Google, Home } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomNotification from "../common/CustomNotification";
import TextFieldController from "../controllers/TextFieldController";

type User = {
  username: string | null;
  password: string | null;
};

function LoginForm() {
  const { handleSubmit, control } = useForm<User>();
  const router = useRouter();
  const [notification, setNotification] = useState<string>("");
  const { data } = useSession();

  useEffect(() => {
    const isUserExpired = localStorage.getItem("isUserExpired");
    if (isUserExpired == "1") return;

    if (data?.user?.role == "ROLE_ADMIN") {
      router.push("/admin/items");
    } else if (data?.user?.role == "ROLE_CUSTOMER") {
      router.push("/products");
    } else return;
  }, [data?.user?.role, router]);

  const handleLoginClick = async (values: User) => {
    try {
      await signIn("credentials", {
        ...values,
        redirect: false,
      });
      localStorage.setItem("isUserExpired", "0");
    } catch (e) {
      setNotification((e as Error)?.response?.data?.message ?? "");
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
          type="password"
        />
        <Stack spacing={2}>
          <Button type="submit" variant="contained">
            Login
          </Button>

          <Button
            onClick={async () => {
              try {
                await signIn("github");
              } catch {
                setNotification("Sign in with Github failed");
              }
            }}
            startIcon={<GitHub />}
            color="error"
            variant="outlined"
          >
            github
          </Button>
          <Button
            onClick={async () => {
              try {
                await signIn("google");
              } catch {
                setNotification("Sign in with Google failed");
              }
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
      <CustomNotification
        open={!!notification}
        onClose={() => setNotification("")}
        message={notification}
        type="error"
      />
    </form>
  );
}

export default LoginForm;
