import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../../../config/axios";

export async function GET(request: NextRequest) {
  try {
    const response = await axiosInstance.get(PATH.ORDERS, {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
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

export async function POST(request: NextRequest) {
  try {
    const response = await axiosInstance.post(PATH.ORDERS, undefined, {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
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
