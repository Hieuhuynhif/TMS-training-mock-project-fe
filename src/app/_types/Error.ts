import { AxiosError, HttpStatusCode } from "axios";

type ErrorResponse = {
  message: string;
  status: HttpStatusCode;
  error: string;
  timeStamp: Date;
};

type Error = AxiosError & {
  response: {
    data: ErrorResponse;
  };
};

export type { Error, ErrorResponse };
