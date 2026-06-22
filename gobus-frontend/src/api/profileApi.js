import api from "./axios";

export const updateProfile = async (formData) => {
  const response = await api.post(
    "/auth/profile/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};