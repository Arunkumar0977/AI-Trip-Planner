"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripDetailContext } from "@/context/TripDetailContext";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    const createUserIfNeeded = async () => {
      if (user) {
        const result = await CreateUser({
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          name: user?.fullName ?? "",
          imageUrl: user?.imageUrl ?? "",
        });
        setUserDetail(result);
      }
    };

    createUserIfNeeded();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useTripDetail = () => {
  return useContext(TripDetailContext);
}