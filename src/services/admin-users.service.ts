import { http } from "./http";

export const getUsersForAdmin = async () => {
  const res = await http.get("/users/admin/getusers");
  return res.data?.data ?? res.data;
};
