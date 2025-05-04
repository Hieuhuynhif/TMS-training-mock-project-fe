"use client";

import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const useCheckAdminLogin = (): void => {
  const router = useRouter();

  useLayoutEffect(() => {
    const isAdminLogin = localStorage.getItem("isLogin");
    if (isAdminLogin !== "ROLE_ADMIN") router.push("/login");
  });
};

function PrivateRoute({ children }: Props) {
  useCheckAdminLogin();

  return <>{children}</>;
}

export default PrivateRoute;
