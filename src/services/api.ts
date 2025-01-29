import { User } from "@prisma/client";
import axios from "axios";

type SaveSubscriptionType = {
  userId: string;
  subscription: PushSubscription;
};

const isServer = typeof window === "undefined";

const axiosInstanceBackendNextjs = axios.create({
  baseURL: isServer ? process.env.NEXT_PUBLIC_BASE_URL : "/",
  timeout: 10000,
});

const axiosInstanceBackendWebSocket = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET || "http://localhost:3333",
  timeout: 10000,
});

axiosInstanceBackendNextjs.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") return config;

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getSubscription = async ({
  userId,
}: {
  userId: string;
}): Promise<PushSubscription> => {
  const result = await axiosInstanceBackendWebSocket.get(
    `/subscriptions/${userId}`
  );

  return result.data[0] ?? null;
};

export const saveSubscription = async ({
  userId,
  subscription,
}: SaveSubscriptionType) => {
  const result = await axiosInstanceBackendWebSocket.post("/subscriptions", {
    subscription,
    userId,
  });

  return result.data;
};

export const deleteSubscription = async ({ userId }: { userId: string }) => {
  const result = await axiosInstanceBackendWebSocket.delete("/subscriptions", {
    data: { userId },
  });

  return result.data;
};

export const getBarberStatus = async () => {
  const result = await axiosInstanceBackendNextjs.get(`/api/open`);
  return result.data;
};

export const setBarberStatus = async () => {
  const result = await axiosInstanceBackendNextjs.post(`/api/open`);
  return result.data;
};

export const getQueue = async () => {
  const result = await axiosInstanceBackendWebSocket.get(`/queue`);
  return result.data;
};

export const getBarbers = async () => {
  const result = await axiosInstanceBackendNextjs.get(`/api/barbers`);
  return result.data;
};

export const getBarberQueueById = async ({
  barberId,
}: {
  barberId?: string;
}) => {
  const result = await axiosInstanceBackendNextjs.get(
    `/api/barbers/${barberId}/queue`
  );

  return result.data;
};

export const updateUser = async (user: Partial<User>) => {
  const result = await axiosInstanceBackendNextjs.put("/api/user", {
    ...user,
  });

  return result.data;
};

export const getBarberById = async (barberId: string) => {
  const result = await axiosInstanceBackendNextjs.get(
    `/api/barbers/${barberId}`
  );
  return result.data;
};
