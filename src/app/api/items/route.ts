import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../../config/axios";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }

    const response = await axiosInstance.post(
      PATH.ITEMS,
      await request.json(),
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    revalidatePath("/admin" + PATH.ITEMS);
    revalidatePath(PATH.PRODUCTS);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json((e as AxiosError).response?.data, {
      status: (e as AxiosError).response?.status,
    });
  }
}
