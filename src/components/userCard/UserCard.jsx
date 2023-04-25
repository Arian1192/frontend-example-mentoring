import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserById } from "../../utils/v1/api";
import { ClockLoader } from "react-spinners";

/* eslint-disable react/prop-types */
const UserCard = ({ user, isFormEdit, setIsFormEdit, setDataUser }) => {
  const [mutating, setMutating] = useState(false);

  const queryClient = useQueryClient();
  const deleteUserByIdMutation = useMutation(["users"], deleteUserById, {
    onMutate: () => {
      setMutating(true);
    },
    onSuccess: () => {
      setMutating(false);
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDeleteUser = (id) => {
    deleteUserByIdMutation.mutate(id);
  };

  const { name, email, role } = user;
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-10 hover:shadow-2xl hover:cursor-pointer">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{email}</p>
        <p>Role: {role}</p>
        <div className="w-fullcard-actions flex flex-row justify-around">
          <button
            className=" btn btn-info hover:btn-success hover:shadow-md"
            onClick={() => {
              setIsFormEdit(!isFormEdit);
              setDataUser(user);
            }}
          >
            Update User 🌟
          </button>

          {mutating ? (
            <button className="w-1/2 btn btn-warning hover:btn-error hover:shadow-md">
              <ClockLoader size={25} />
            </button>
          ) : (
            <button
              className="btn w-1/2 btn-warning hover:btn-error hover:shadow-md"
              onClick={() => {
                handleDeleteUser(user._id);
              }}
            >
              Delete User 🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
