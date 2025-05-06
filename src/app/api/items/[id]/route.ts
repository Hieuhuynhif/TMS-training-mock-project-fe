import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../../../config/axios";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = request.json();

    const response = await axiosInstance.put(PATH.ITEMS + "/" + id, body, {
      headers: {
        Authorization: request.headers.get("Authorization"),
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await axiosInstance.delete(PATH.ITEMS + "/" + id, {
      headers: {
        Authorization: request.headers.get("Authorization") ?? "",
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
