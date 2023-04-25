/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createUser, updateUserById } from "../../utils/v1/api";
const Form = ({ dataUser, isFormEdit, setIsFormEdit }) => {
  const [isCreateUser, setIsCreateUser] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const createUserMutation = useMutation(["users"], createUser, {
    onMutate: () => {
      setIsCreateUser(true);
    },
    onSuccess: () => {
      setIsCreateUser(false);
      queryClient.invalidateQueries(["users"]);
    },
  });

  const updateUserMutation = useMutation(updateUserById, {
    onMutate: () => {
      setIsCreateUser(true);
    },
    onSuccess: () => {
      setIsCreateUser(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onUpdate = (data) => {
    updateUserMutation.mutate({ ...data, _id: dataUser._id });
    reset();
    setIsFormEdit(!isFormEdit);
  };

  const onSubmit = (data) => {
    createUserMutation.mutate(data);
    reset();
  };

  // esto dara problemas
  if (dataUser === {}) {
    reset(dataUser);
  }

  return (
    <div className="p-10 shadow-md flex justify-center items-center h-[40%] rounded-xl hover:shadow-xl transition-all delay-75 ease-linear">
      <form
        onSubmit={handleSubmit(isFormEdit ? onUpdate : onSubmit)}
        className="w-full flex flex-col gap-4 max-w-xs"
      >
        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          className="input input-bordered"
        />
        <input
          type="text"
          {...register("email")}
          placeholder="Email ⌨️"
          className="input input-bordered"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="password 🔑"
          autoComplete="off"
          className="input input-bordered"
        />
        {isCreateUser && (
          <button type="submit" className=" btn btn-secondary">
            {" "}
            {isFormEdit ? "Updating User" : "Creating User"}
          </button>
        )}
        {!isCreateUser && (
          <button type="submit" className={`${isFormEdit ? 'btn btn-primary': 'btn btn-secondary'}`}>
            {" "}
            {isFormEdit ? "Update User" : "Create User"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
