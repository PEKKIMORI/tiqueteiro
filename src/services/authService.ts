import { AxiosRequestConfig } from "axios";
import api from "./api";

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  rm: string
}

interface LoginParams {
  email: string;
  password: string;
}

export type TicketType = {
  id: number;
  sellerName: string
  buyerName: string | null
  code: string
  used: boolean
  price: number
  purchaseDate?: Date | null
  apiTransactionId?: string | null
  userId: number
};

interface validateParams {
  code: string
  payerEmail: string
  payerName: string
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },
  login: async (params: LoginParams) => {
    const res = await api.post("/auth/login", params).catch((error) => {
    if (error.response.status === 400 || error.response.status === 401) {
      return error.response;
    }
    return error;
   });

  if (res.status === 200)
	sessionStorage.setItem("onebitflix-token", res.data.token);

  return res
  },
  findUser:async (token: string) => {
    const res = await api.get('/find', {
      headers: {
          Authorization: `Bearer ${ token }`
      }
    }).catch((error) => {
      if (error.response.status === 400 || error.response.status === 500) {
        return error.response;
      }
    })
    console.log(res)
    return res
  },
  payment: async (ticket: string) => {
    const res = await api.post(`/payment/${ticket}`).catch((error) => {
      if (error.response.status === 500 || error.response.status === 501) {
        return error.response;
      }
    })
  console.log(ticket)
  return res
  },
  getTickets:async (token: string) => {
    const res = await api.get("/home", {
      headers: {
          Authorization: `Bearer ${ token }`
      }
    }).catch((error) => {
        return error.response;
    })
    console.log(res)
    return res;
  },
  validate:async (params: validateParams, config?: AxiosRequestConfig) => {
    const res = await api.post('/validate', params, config).catch((error) => {
      if (error.response.status === 400 || error.response.status === 401) {
        return error.response;
      }
      return error;
     });

    return res
  },
  scan: async (code:string, config?: AxiosRequestConfig) => {
    const res = await api.post(`/scan/${code}`, undefined, config).catch((error) => {
      if (error.response.status === 400 || error.response.status === 401) {
        return error.response;
      }
      return error
    })

    return res
  }
};

export default authService;