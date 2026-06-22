import api from "./axios";

export const createBooking = async (data) => {
  const response = await api.post(
    "/bookings",
    data
  );

  return response.data;
};



export const myBookings = async (type = "current") => {
  const response = await api.get(
    "/bookings/my",
    {
      params: {
        type
      }
    }
  );

  return response.data;
};



export const payBooking = async (id) => {
  const response = await api.post(
    `/bookings/${id}/pay`
  );

  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.post(
    `/bookings/${id}/cancel`
  );

  return response.data;
};

export const getTicket = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};
export const verifyTicket = async (token) => {
  const response = await api.get(
    `/tickets/verify/${token}`
  );

  return response.data;
};

export const downloadTicket = async (id) => {
  const response = await fetch(
    `http://localhost:8000/api/tickets/${id}/download`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `ticket-${id}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};