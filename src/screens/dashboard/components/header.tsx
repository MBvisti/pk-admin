import React from "react";
import { useQuery } from "react-query";

import { endpoints } from "../../../http/api";

import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../../../context/authContext";
import { AuthFunctions } from "../../../context/interfaces";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  const { isLoading, data } = useQuery("status", endpoints.status().apiStatus);

  const authData = useAuth() as AuthFunctions;
  return (
    <div className="md:h-14 md:mt-6 md:flex md:justify-between md:items-center">
      <p>
        API is{" "}
        {isLoading ? (
          ""
        ) : data?.status === 200 ? (
          <span className="text-green-600">good</span>
        ) : (
          <span className="text-red-600">bad</span>
        )}
      </p>

      <div className="md:flex md:items-center">
        <span className="md:mr-4 md:flex md:items-center">
          <AiOutlineUser className="md:mr-2" />
          <p className="text-sm">{userName}</p>
        </span>
        <AiOutlineLogout
          onClick={() => authData.logout()}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
