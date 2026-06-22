import api from "./axios";

export const searchTrips = async (params) => {
  const response = await api.get("/trips/search", {
    params,
  });

  return response.data;
};

export const getTrips = async () => {
  const response = await api.get("/trips");

  return response.data;
};

export const getTripDetails = async (id) => {
  const response = await api.get(`/trips/${id}`);

  return response.data;
};

