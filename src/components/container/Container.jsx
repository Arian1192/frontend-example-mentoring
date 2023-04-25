import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../../utils/v1/api";
import { ClimbingBoxLoader } from "react-spinners";
import UserCard from "../userCard/UserCard";
import Form from "../form/Form";

const Container = () => {
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [dataUser, setDataUser] = useState({});

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return (
      <p className="flex flex-col justify-center items-center h-screen">
        <ClimbingBoxLoader color="#000" />
      </p>
    );
  }

  return (
    <div className="flex flex-row justify-around items-center max-sm:flex-col max-sm:p-10">
      <div className="flex-grow-1 flex-shrink-0 flex flex-col justify-center items-center">
        <p className="text-4xl font-semibold m-5">React Query Example</p>
        <Form
          dataUser={dataUser}
          isFormEdit={isFormEdit}
          setIsFormEdit={setIsFormEdit}
        />
      </div>
      <div className="w-[50%] flex flex-wrap justify-evenly items-center h-screen">
        {!isLoading &&
          users.map((user, index) => {
            return (
              <UserCard
                key={index}
                user={user}
                isFormEdit={isFormEdit}
                setIsFormEdit={setIsFormEdit}
                setDataUser={setDataUser}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Container;
