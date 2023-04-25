import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAllUsers = () => {
  return api
    .get("/user")
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const createUser = (user) => {
  return api
    .post("/user", user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const deleteUserById = (id) => {
  return api
    .delete(`/user/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const updateUserById = (data) => {
  const { _id, name, email, password } = data;
  console.log(_id);
  const user = { name, email, password };
  return api
    .patch(`/user/${_id}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};
