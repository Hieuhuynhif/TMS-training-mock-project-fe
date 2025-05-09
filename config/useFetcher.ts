"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Props<T> = {
  callback: (...args: string[]) => Promise<T>;
};

const useFetcher = <T>({ callback }: Props<T>) => {
  const router = useRouter();

  return async (...args: string[]) => {
    try {
      const result: T = await callback(...args);
      return result;
    } catch (error) {
      if ((error as AxiosError)?.status == 401) {
        router.push("/login");
        localStorage.setItem("isUserExpired", "1");
      }
      return Promise.reject(error);
    }
  };
};

export default useFetcher;
