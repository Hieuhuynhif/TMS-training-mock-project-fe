import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { axiosInstance } from "../../../../../config/axios";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }
console.log("first")
    const response = await axiosInstance.get(PATH.ORDERS + "/lastestOrder", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: (e as AxiosError).response?.data },
      { status: (e as AxiosError).response?.status }
    );
  }
}
