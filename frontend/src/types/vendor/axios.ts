import { Method } from "axios";

export type AxiosParams = {
    method?: Method;
    url: string;
    baseURL: string;
    data?: object;
    params?: object;
  };
  