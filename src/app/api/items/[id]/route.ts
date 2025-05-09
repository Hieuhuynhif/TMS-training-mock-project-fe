import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../../../config/axios";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }

    const response = await axiosInstance.put(PATH.ITEMS + "/" + id, body, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    revalidatePath("/admin" + PATH.ITEMS);
    revalidatePath("/admin" + PATH.ITEMS + "/" + id);
    revalidatePath(PATH.PRODUCTS);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: (e as AxiosError).response?.data },
      { status: (e as AxiosError).response?.status }
    );
  }
}

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

    const response = await axiosInstance.delete(PATH.ITEMS + "/" + id, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    revalidatePath("/admin" + PATH.ITEMS);
    revalidatePath("/admin" + PATH.ITEMS + "/" + id);
    revalidatePath(PATH.PRODUCTS);

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: (e as AxiosError).response?.data },
      { status: (e as AxiosError).response?.status }
    );
  }
}
