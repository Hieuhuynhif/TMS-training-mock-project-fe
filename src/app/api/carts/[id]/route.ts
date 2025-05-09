import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../../../config/axios";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }

    const response = await axiosInstance.delete(PATH.CARTS + "/" + id, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json((e as AxiosError).response?.data, {
      status: (e as AxiosError).response?.status,
    });
  }
}
