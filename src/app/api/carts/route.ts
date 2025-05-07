import PATH from "@/app/_constants/PATH";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../../config/axios";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }

    const response = await axiosInstance.get(PATH.CARTS, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return NextResponse.json(response);
  } catch (e) {
    console.log(JSON.stringify(e));
    return NextResponse.json(
      { error: (e as AxiosError).response?.data },
      { status: (e as AxiosError).response?.status }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }

    const response = await axiosInstance.post(
      PATH.CARTS,
      await request.json(),
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: (e as AxiosError).response?.data },
      { status: (e as AxiosError).response?.status }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw null;
    }

    const response = await axiosInstance.put(PATH.CARTS, await request.json(), {
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
