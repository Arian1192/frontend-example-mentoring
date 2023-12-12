import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export const getAllUsers = async () => {
  try {
    const response = await api.get("user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for React Query to catch
  }
};


export const createUser = (user) => {
  console.log("Hola Entro aqui")
  return api
    .post("user", user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const deleteUserById = (id) => {
  console.log("Hola Entro aqui")
  return api
    .delete(`user/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const updateUserById = (data) => {
  console.log(data)
  const { _id, name, email, password } = data;
  console.log(_id);
  const user = { name, email, password };
  return api
    .patch(`user/${_id}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};
