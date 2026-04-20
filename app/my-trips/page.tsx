"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetail } from "../_components/provider";
import { TripInfo } from "../create-new-trip/_components/ChatBox";
import MyTripCardItem from "./_component/MyTripCardItem";

export type Trip = {
  tripId: any;
  tripDetail: TripInfo;
  _id: string;
};

export default function MyTrips() {
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const { userDetail } = useUserDetail();
  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      getUserTrip();
    }
  }, [userDetail]);

  const getUserTrip = async () => {
    try {
      const result = await convex.query(api.tripDetail.GetUserTrips, {
        uid: userDetail?._id,
      });

      setMyTrips(result || []);
      console.log(result);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="px-10 p-10 md:px-24 lg:px-48">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {myTrips.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-5">
          <h2 className="text-xl text-center mt-6">
            You have no trips yet. Create a new trip to get started!
          </h2>
          <Link href="/create-new-trip">
            <Button>Create New Trip</Button>
          </Link>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myTrips.map((trip, index) => (
          <MyTripCardItem key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}