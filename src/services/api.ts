import axios from "axios";

type SaveSubscriptionType = {
  userId: string;
  subscription: PushSubscription;
};

const axiosInstanceBackendNextjs = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

const axiosInstanceBackendWebSocket = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
  timeout: 10000,
});

axiosInstanceBackendNextjs.interceptors.request.use(
  (config) => {
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

export const getSubscription = async ({ userId }: { userId: string }) => {
  const result = await axiosInstanceBackendWebSocket.get(
    `/subscriptions/${userId}`
  );

  return result.data;
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
